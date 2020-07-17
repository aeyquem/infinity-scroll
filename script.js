const usplashAccessKey = 'ADD_KEY'
const usplashUrl = `https://api.unsplash.com/photos/?client_id=${usplashAccessKey}&count=5`

let imageCount = 0;
let ImagesToLoad = 0;
let isReady = false;

const loader = document.getElementById('loader');
let imageList = document.getElementById('image-container');

setAttributes = (element, attributes) => {
    for (key in attributes) {
        element.setAttribute(key, attributes[key])
    };
}

imageLoaded = () => {
    imageCount++;
    if (imageCount == 1) {
        loader.hidden = true;
    }
    if (imageCount === ImagesToLoad) {
        isReady = true;
    }
}

displayImages = (images) => {
    imageCount = 0;
    ImagesToLoad = images.length;
    images.forEach(element => {
        const anchor = document.createElement('a');
        setAttributes(anchor, {
            href: element.links.html,
            target: '_blank',
        });
        const image = document.createElement('img');
        setAttributes(image, {
            src: element.urls.regular,
            alt: element.alt_description,
            title: element.alt_description
        })
        image.addEventListener('load', imageLoaded);
        anchor.appendChild(image);
        imageList.appendChild(anchor);
    });
}

getImages = async () => {
    try {
        const response = await fetch(usplashUrl).then(r => r.json());
        displayImages(response)
    } catch (error) {
        console.log(error);
    }
}

getImages();

window.addEventListener('scroll', () => {
    if (isReady && window.scrollY + window.innerHeight >= imageList.offsetHeight - 1000) {
        getImages();
        isReady = false;
    }
});