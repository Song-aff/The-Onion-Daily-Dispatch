const axios = require('axios')
const fs = require('fs')
const path = require('path')

// 从环境变量获取token
const token = process.env.COZE_TOKEN;


if (!token) {
  console.error('错误: 未找到 COZE_TOKEN 环境变量')
  console.error('当前环境变量列表:', Object.keys(process.env).filter(k => k.includes('COZE')))
  process.exit(1)
}

async function callCozeAPI(args = {}) {
  const { keyword = '', needImg = false } = args
  try {
    const response = await axios.post(
      'https://api.coze.cn/v1/workflow/run',
      {
        workflow_id: '7536027738752532519',
        parameters: {
          keyword,
          needImg,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )

    console.log('状态码:', response.status)
    console.log('响应数据:', JSON.stringify(response.data, null, 2))

    return JSON.parse(response.data?.data)
  } catch (error) {
    if (error.response) {
      console.error('响应错误:', error.response.status, error.response.data)
    } else {
      console.error('请求错误:', error.message)
    }
  }
}

const template = (title, summary, content,img) =>
  `---
title: "${title}"
---

>${summary}
<!-- truncate -->

${img ? '![img](./img.png)' : ''}

${content}
`

// 下载图片到本地
const downloadImg = (imgUrl, folderPath) => {
  if (!imgUrl) {
    console.log('⚠️ 没有图片链接，跳过下载')
    return Promise.resolve()
  }

  return axios
    .get(imgUrl, { responseType: 'stream' })
    .then((response) => {
      const imgPath = path.join(folderPath, 'img.png')
      const writer = fs.createWriteStream(imgPath)

      response.data.pipe(writer)

      return new Promise((resolve, reject) => {
        writer.on('finish', () => {
          console.log('✅ 图片下载完成:', imgPath)
          resolve()
        })
        writer.on('error', (error) => {
          console.error('❌ 图片下载失败:', error.message)
          reject(error)
        })
      })
    })
    .catch((error) => {
      console.error('❌ 图片下载失败:', error.message)
      return Promise.resolve()
    })
}

// 写到blog下，创建文件夹，文件夹名称为日YYYY-MM-DD-news,文件名称为index.md,文件内容为content
// 文件夹存在时，不创建
// img为链接，需要下载到本地，并写入到文件夹下，文件名称为img.png
const writeToFile = (content, img) => {
  const dateStr = new Date().toISOString().split('T')[0]
  const folderName = `${dateStr}-news`
  // 使用项目根目录而不是当前脚本目录
  const projectRoot = path.resolve(__dirname, '..')
  const folderPath = path.join(projectRoot, 'blog', folderName)
  const filePath = path.join(folderPath, 'index.md')

  // 检查文件夹是否已存在
  if (fs.existsSync(folderPath)) {
    console.log('❌ 文件夹已存在:', folderPath)
    return Promise.resolve()
  }

  try {
    // 创建文件夹
    fs.mkdirSync(folderPath, { recursive: true })
    console.log('✅ 创建文件夹:', folderPath)

    // 写入markdown文件
    fs.writeFileSync(filePath, content, 'utf8')
    console.log('✅ 内容已成功写入到:', filePath)

    // 下载图片
    if (img) {
      return downloadImg(img, folderPath)
    } else {
      return Promise.resolve()
    }
  } catch (error) {
    console.error('❌ 写入文件失败:', error.message)
    return Promise.resolve()
  }
}

callCozeAPI({ needImg: true })
  .then((data) => {
    console.log('API响应数据:', JSON.stringify(data, null, 2))
    const img = data?.img
    if (data && data.output) {
      const content = template(data.output.title, data.output.summary, data.output.content, img)
      return writeToFile(content, img)
    } else {
      console.error('❌ API返回数据格式不正确')
      return Promise.resolve()
    }
  })
  .catch((error) => {
    console.error('❌ 处理失败:', error.message)
  })
