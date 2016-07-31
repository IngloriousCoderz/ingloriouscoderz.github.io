export default url => {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url)

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response)
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        })
      }
    }

    xhr.onerror = function() {
      reject({
        status: xhr.status,
        statusText: xhr.statusText
      })
    }

    xhr.send()
  })
}
