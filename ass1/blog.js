function initializeLikesAndComments() {
    initialize('likesPost1', 'commentsPost1', 'commentListPost1', 'commentsCountPost1');
    initialize('likesPost2', 'commentsPost2', 'commentListPost2', 'commentsCountPost2');
}

function initialize(likesKey, commentsKey, commentListId, commentsCountId) {
    let initialLikes = localStorage.getItem(likesKey) || 0;
    let initialComments = localStorage.getItem(commentsKey) || 0;

    document.querySelector(`.${likesKey}`).textContent = initialLikes + ' Likes';
    document.querySelector(`.${commentsKey}`).textContent = initialComments + ' Comments';
    document.querySelector(`.${commentsCountId}`).textContent = initialComments + ' Comments';

    displayComments(commentListId, commentsKey);
}

function increaseLikes(storageKey) {
    let currentLikes = localStorage.getItem(storageKey);

    currentLikes = currentLikes ? parseInt(currentLikes) : 0;

    currentLikes++;

    localStorage.setItem(storageKey, currentLikes);

    event.target.textContent = currentLikes + ' Likes';
}

function toggleComments(commentListId) {
    const commentList = document.getElementById(commentListId);
    commentList.classList.toggle('hidden');
}

function displayComments(commentListId, storageKey) {
    const commentList = document.getElementById(commentListId);
    const storedComments = JSON.parse(localStorage.getItem(storageKey + '_comments')) || [];

    storedComments.forEach(comment => {
        const li = document.createElement('li');
        li.textContent = comment;
        commentList.appendChild(li);
    });
}

function submitComment(storageKey, inputId, commentListId, commentsCountId) {
    const userComment = document.getElementById(inputId).value.trim();

    if (userComment !== '') {
        let currentComments = localStorage.getItem(storageKey);

        currentComments = currentComments ? parseInt(currentComments) : 0;

        localStorage.setItem(storageKey, currentComments + 1);

        document.querySelector(`.${commentsCountId}`).textContent = (currentComments + 1) + ' Comments';

        const storedComments = JSON.parse(localStorage.getItem(storageKey + '_comments')) || [];
        storedComments.push(userComment);
        localStorage.setItem(storageKey + '_comments', JSON.stringify(storedComments));

        const commentList = document.getElementById(commentListId);
        const li = document.createElement('li');
        li.textContent = userComment;
        commentList.appendChild(li);
        document.getElementById(inputId).value = '';
    } else {
        alert('Please enter a non-empty comment.');
    }
}
function resetLikesAndComments(likesKey, commentsKey, commentListId, commentsCountId) {

    localStorage.removeItem(likesKey);
    localStorage.removeItem(commentsKey + '_comments');

    document.querySelector(`.${likesKey}`).textContent = '0 Likes';
    document.querySelector(`.${commentsKey}`).textContent = '0 Comments';
    document.querySelector(`.${commentsCountId}`).textContent = '0 Comments';

    const commentList = document.getElementById(commentListId);
    commentList.innerHTML = '';
    localStorage.clear();
    location.reload();
}
document.addEventListener('DOMContentLoaded', initializeLikesAndComments);