Callback = complicated risk to be callback hell (fking hard to read)
Promise = Clean , easy to read we can use async and await its still promise but more clean 

// แบบ Promise .then/.catch
function getData1() {
  return fetchDataPromise()
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

// แบบ Async/Await
async function getData2() {
  try {
    const data = await fetchDataPromise();  // ยังคงเรียก Promise เดิม!
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

// ทั้งสองฟังก์ชัน return Promise!
console.log(getData1());  // Promise { ... }
console.log(getData2());  // Promise { ... }