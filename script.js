function filterContent() {
    // 1. Get the search text
    const input = document.getElementById('wikiSearch');
    const filter = input.value.toLowerCase();
    
    // 2. Select all containers you want to search through
    // For your semester pages, we search through '.course-table'
    const tables = document.querySelectorAll('.course-table, .semester-table tr');

    tables.forEach(element => {
        // We get all the text content within the table/row
        const text = element.textContent || element.innerText;
        
        if (text.toLowerCase().indexOf(filter) > -1) {
            // Match found: Show it
            element.style.display = ""; 
            
            // If it's a course table, maybe add a highlight effect
            if(element.classList.contains('course-table')) {
                element.style.border = "2px solid #0645ad";
            }
        } else {
            // No match: Hide it
            element.style.display = "none";
        }
    });

    // Reset borders if search is cleared
    if (filter === "") {
        document.querySelectorAll('.course-table').forEach(t => t.style.border = "");
    }
}