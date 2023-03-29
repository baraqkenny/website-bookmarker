const submitBookmark = document.querySelector('.form');

submitBookmark.addEventListener('submit', (e)=> {
    e.preventDefault();

        const buttonClick = document.querySelector('.btn')
        buttonClick.style.border = '2px solid black';
    
    
    
    //Get form values
    const siteName = document.querySelector('.siteName').value;
    const siteUrl = document.querySelector(".siteUrl").value;

    const bookmark = {
        name: siteName,
        url: siteUrl
    }
    
    if(localStorage.getItem('bookmarks') === null){

        const bookmarks = [];
        bookmarks.push(bookmark);

        // Set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }else{
        // Get bookmarks from localStorage
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
         // Add bookmark to array
         bookmarks.push(bookmark);
        // Reset back to localStorage
         localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
});

function fetchBookmarks(){
    //Get bookmarks from local storage
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Get output id
    const bookmarkResult = document.querySelector('.bookmarkResult')

    //Building the output
    bookmarkResult.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
        const name = bookmarks[i].name;
        const url = bookmarks[i].url;

        bookmarkResult.innerHTML += `<div class="well">
                                    <h3>${name}</h3>
                                    </div>`;
    }
}