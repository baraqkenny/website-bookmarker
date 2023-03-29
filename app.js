const submitBookmark = document.querySelector('.form');

submitBookmark.addEventListener('submit', (e)=> {
    e.preventDefault();
    
    
    //Get form values
    const siteName = document.querySelector('.siteName').value;
    const siteUrl = document.querySelector(".siteUrl").value;

    if(!validateForm(siteName, siteUrl)){
        return false;
    }

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

    // Clear Form
    document.querySelector('.form').reset();

    // Re-fetch bookmarks
    fetchBookmarks();
});

// Delete bookmark
function deleteBookmark(url) {
   // Get bookmarks from localStorage
   const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
   // Iterate through bookmarks  
   for(let i = 0; i < bookmarks.length; i++){
    if(bookmarks[i].url === url){
        // Remove from array
        bookmarks.splice(i, 1);
    }
   }
   // Re-set back to localStorage 
   localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

   // Re-fetch bookmarks
   fetchBookmarks();
}

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

        bookmarkResult.innerHTML += `<div class="bookmarked-output">
                                    <h3>${name}</h3>
                                    <a href=${url} class="visit-btn" target="_blank">
                                    Visit
                                    </a>
                                     <a href="#" onclick="deleteBookmark(\`${url}\`)" class="delete-btn">Delete</a>
                                    </div>`;
    }
}

    // Validate Form
    function validateForm(siteName, siteUrl){
         if (!siteName || !siteUrl) {
           alert("please fill in the form");
           return false;
         }

         const expression =
           /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
         const regex = new RegExp(expression);

         if (!siteUrl.match(regex)) {
           alert("Please use a valid URL");
           return false;
         }

         return true;
    }

   