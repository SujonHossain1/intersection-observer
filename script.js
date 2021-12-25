const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle('show', entry.isIntersecting);
        if (entry.isIntersecting) observer.unobserve(entry.target)
    })
}, {
    threshold: 1,
});

const lastCardObserver = new IntersectionObserver((entries) => {
    console.log("reach last child");
    const lastCard = entries[0];

    if (!lastCard.isIntersecting) return;
    loadNewCards();
    lastCardObserver.unobserve(lastCard.target);
    lastCardObserver.observe(document.querySelector('.card:last-child'));

}, {});


lastCardObserver.observe(document.querySelector('.card:last-child'));


cards.forEach(card => {
    observer.observe(card)
});

function* generateId() {
    let i = 1;
    while (true) {
        yield i++;
    }
};

const getId = generateId();



const cardContainer = document.querySelector('.card-container');

function loadNewCards() {
    const card = document.createElement('card');
    card.textContent = `New Card ${getId.next().value}`
    card.classList.add('card');

    observer.observe(card);
    cardContainer.appendChild(card)

}
