import feedbackTemplate from '../templates/feedback.hbs';

export function generateComments(comments) {
    const feedbackList = document.querySelector('.feedback__list');

    feedbackList.innerHTML = feedbackTemplate({
        comments: comments
    });
}
