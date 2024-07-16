
const apikey = '4Ojojg9YKTwWJKCDufFYXH1HxuvOC8XE0RyLc97EMGY';
// 
const icon  =document.querySelector('.material-symbols-outlined')
const reload =document.querySelector('.reload');
const input =document.querySelector('.inputTag')
const form = document.querySelector("form");
const imgCon =document.querySelector('.imagesContainer')
const loadmore = document.querySelector('.loadmore')
let data;
let page = 1;
//finction fetch imges

// func 1 //


const fetchImages = async (query, page) => {
    const url = `https://api.unsplash.com/search/photos/?query=${query}&per_page=16&page=${page}&client_id=${apikey}`;

   
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        console.log(data.total_pages)
        if (page === 1) {
            imgCon.innerHTML = '';
        }
        if (data.results.length > 0) {
            if (data.total_pages === page) {
                loadmore.style.display = "none";
            } else {
                loadmore.style.display = "block";
            }
        }

        if(data.total_pages==0){
            loadmore.style.display = "none";
            imgCon.innerHTML=`<h2> NO IMAGES FOUND </h2>`
        }

        data.results.forEach(photo => {
            const imageElm = document.createElement('div');
            imageElm.classList.add('imgDiv');
            imageElm.innerHTML = `<img src="${photo.urls.regular}" />`;



            // Create a download button
            const downloadButton = document.createElement('button');
            downloadButton.innerText = 'Download';
            downloadButton.classList.add('download-button');
            downloadButton.addEventListener('click', () => {
                downloadImage(photo.urls.full, `${photo.alt_description}.jpg`);
            });

            //overlay

            const overlayElm = document.createElement("div");
            overlayElm.classList.add('overlay');

            const overlaytxt = document.createElement('h3');
            overlaytxt.innerText = `${photo.alt_description}`;
            overlaytxt.classList.add('overlaytxt');

            overlayElm.appendChild(overlaytxt);
            overlayElm.appendChild(downloadButton); // Append download button to overlay
            imageElm.appendChild(overlayElm);
            imgCon.appendChild(imageElm);
        });

        console.log("query done");
        
  
    
  
};



///function 2 //

form.addEventListener('submit',(e)=>{

    e.preventDefault();     //prevents auto submit

    const inputtext = input.value.trim();  //inputs text


if(inputtext !==''){
    page = 1;
    fetchImages(inputtext.trim(),page);
   

}
else {
    imgCon.innerHTML = `<h2> please enter a something</h2> `;  //if nothing 
    loadmore.style.display = "none";

    console.log("no thing")
}

loadmore.addEventListener('click',()=>{
    // const innerText = input.value.trim();
    
    fetchImages(inputtext,++page)
    console.log('clicke load')
   console.log(total_pages)
   
})

})

/// search -icon //

icon.addEventListener("click",(e)=>{

console.log("clicked search")

    e.preventDefault();     //prevents auto submit

    const inputtext = input.value.trim();  //inputs text


if(inputtext !==''){
    page = 1;
    fetchImages(inputtext.trim(),page);
   

}
else {
    imgCon.innerHTML = `<h2> please enter a something</h2> `;  //if nothing 
    loadmore.style.display = "none";

    console.log("no thing")
}

loadmore.addEventListener('click',()=>{
    // const innerText = input.value.trim();
    
    fetchImages(inputtext,++page)
    console.log('clicke load')
   console.log(total_pages)
   
})
})



/// downloadImage //


const downloadImage = (url, filename) => {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        })
        .catch(error => console.error('Error downloading image:', error));
};