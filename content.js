function addInvidiousLinkToContainer(videoContainer, videoLinkSelector, titleSelector) {
    const videoLink = videoContainer.querySelector(videoLinkSelector);
    const titleElement = videoContainer.querySelector(titleSelector);

    if (videoLink && titleElement) {
        const videoIdMatch = videoLink.href.match(/v=([a-zA-Z0-9_-]+)/);
        if (videoIdMatch && !videoContainer.classList.contains('invidious-processed')) {
            const invidiousLink = document.createElement('a');
            invidiousLink.href = `https://invidious.perennialte.ch/watch?v=${videoIdMatch[1]}`;
            invidiousLink.textContent = '[Invidious]';
            invidiousLink.style.marginLeft = '5px';
            titleElement.after(invidiousLink);
            videoContainer.classList.add('invidious-processed');
        }
    }
}

function processCurrentVideos() {
    const searchVideoContainers = document.querySelectorAll('ytd-video-renderer:not(.invidious-processed)');
    const homepageVideoContainers = document.querySelectorAll('ytd-rich-item-renderer:not(.invidious-processed)');

    searchVideoContainers.forEach(container => {
        addInvidiousLinkToContainer(container, 'a.yt-simple-endpoint.inline-block.style-scope.ytd-thumbnail', 'h3.title-and-badge.style-scope.ytd-video-renderer a');
    });

    homepageVideoContainers.forEach(container => {
        addInvidiousLinkToContainer(container, 'a#thumbnail.yt-simple-endpoint.inline-block', '#meta a');
    });
}

let lastTimeout;
new MutationObserver(() => {
    clearTimeout(lastTimeout);
    lastTimeout = setTimeout(processCurrentVideos, 500);
}).observe(document.body, {
    childList: true,
    subtree: true
});

processCurrentVideos();
