// DOM Elements
const semesterNav = document.getElementById('semesterNav');
const subjectsContainer = document.getElementById('subjectsContainer');
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearch');
const searchInfo = document.getElementById('searchInfo');
const contentTitle = document.getElementById('contentTitle');
const expandAllBtn = document.getElementById('expandAllBtn');
const collapseAllBtn = document.getElementById('collapseAllBtn');
const emptyState = document.getElementById('emptyState');
const pdfModal = document.getElementById('pdfModal');
const closeModal = document.getElementById('closeModal');
const pdfViewer = document.getElementById('pdfViewer');
const pdfTitle = document.getElementById('pdfTitle');
const downloadPdf = document.getElementById('downloadPdf');
const openNewTab = document.getElementById('openNewTab');

// State variables
let currentSemester = pdfRepository.semesters[0];
let searchQuery = '';
let searchTimeout = null;

// Initialize the website
function init() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Build sidebar navigation
    buildSemesterNav();
    
    // Load the first semester by default
    loadSemester(currentSemester);
    
    // Setup event listeners
    setupEventListeners();
    
    // Show initial search info
    updateSearchInfo();
}

// Build the semester navigation sidebar
function buildSemesterNav() {
    semesterNav.innerHTML = '';
    
    pdfRepository.semesters.forEach(semester => {
        const semesterItem = document.createElement('div');
        semesterItem.className = 'semester-item';
        
        const semesterBtn = document.createElement('button');
        semesterBtn.className = 'semester-btn';
        semesterBtn.innerHTML = `
            <span>${semester.name}</span>
            <i class="fas fa-chevron-down"></i>
        `;
        
        // Mark first semester as active by default
        if (semester.id === currentSemester.id) {
            semesterBtn.classList.add('active');
        }
        
        semesterBtn.addEventListener('click', () => {
            // Update active state
            document.querySelectorAll('.semester-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            semesterBtn.classList.add('active');
            
            // Load selected semester
            loadSemester(semester);
        });
        
        semesterItem.appendChild(semesterBtn);
        semesterNav.appendChild(semesterItem);
    });
    
    // Add placeholder for future semesters
    const futureSemester = document.createElement('div');
    futureSemester.className = 'semester-item';
    
    const futureBtn = document.createElement('button');
    futureBtn.className = 'semester-btn';
    futureBtn.innerHTML = `
        <span>2nd Semester</span>
        <i class="fas fa-lock"></i>
    `;
    futureBtn.disabled = true;
    futureBtn.style.opacity = '0.6';
    futureBtn.style.cursor = 'not-allowed';
    
    futureSemester.appendChild(futureBtn);
    semesterNav.appendChild(futureSemester);
}

// Load a semester's content into the main area
function loadSemester(semester) {
    currentSemester = semester;
    contentTitle.textContent = `${semester.name} Subjects`;
    
    // Clear search when switching semesters
    searchInput.value = '';
    searchQuery = '';
    updateSearchInfo();
    
    // Build subjects for this semester
    buildSubjects(semester.subjects);
    
    // Show subjects container, hide empty state
    subjectsContainer.style.display = 'flex';
    emptyState.style.display = 'none';
}

// Build subjects HTML
function buildSubjects(subjects, isSearchResult = false) {
    subjectsContainer.innerHTML = '';
    
    if (!subjects || subjects.length === 0) {
        subjectsContainer.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    subjects.forEach(subject => {
        const subjectElement = createSubjectElement(subject, isSearchResult);
        subjectsContainer.appendChild(subjectElement);
    });
}

// Create a subject element
function createSubjectElement(subject, isSearchResult = false) {
    const subjectDiv = document.createElement('div');
    subjectDiv.className = 'subject';
    subjectDiv.dataset.subjectId = subject.id;
    
    // Determine if subject should be expanded (expanded if it's a search result)
    const isExpanded = isSearchResult || subject.id === 'bcs-012'; // Default expand first subject
    
    const subjectHeader = document.createElement('div');
    subjectHeader.className = `subject-header ${isExpanded ? '' : 'collapsed'}`;
    subjectHeader.innerHTML = `
        <h3>
            <i class="fas fa-book"></i>
            <span class="subject-name">${highlightText(subject.name, searchQuery)}</span>
        </h3>
        <i class="fas fa-chevron-up"></i>
    `;
    
    const subjectContent = document.createElement('div');
    subjectContent.className = 'subject-content';
    subjectContent.style.display = isExpanded ? 'block' : 'none';
    
    // Add blocks for this subject
    subject.blocks.forEach(block => {
        const blockElement = createBlockElement(block, subject, isSearchResult);
        subjectContent.appendChild(blockElement);
    });
    
    // Toggle subject collapse/expand
    subjectHeader.addEventListener('click', () => {
        const isCollapsed = subjectHeader.classList.contains('collapsed');
        
        if (isCollapsed) {
            subjectHeader.classList.remove('collapsed');
            subjectContent.style.display = 'block';
        } else {
            subjectHeader.classList.add('collapsed');
            subjectContent.style.display = 'none';
        }
    });
    
    subjectDiv.appendChild(subjectHeader);
    subjectDiv.appendChild(subjectContent);
    
    return subjectDiv;
}

// Create a block element
function createBlockElement(block, subject, isSearchResult = false) {
    const blockDiv = document.createElement('div');
    blockDiv.className = 'block';
    
    // Check if this block has units or is a direct PDF block
    const hasUnits = block.units && block.units.length > 0;
    
    if (hasUnits) {
        // Block with units (collapsible)
        const isExpanded = isSearchResult || block.id === 'block-1'; // Default expand first block
        
        const blockHeader = document.createElement('div');
        blockHeader.className = `block-header ${isExpanded ? '' : 'collapsed'}`;
        blockHeader.innerHTML = `
            <h4>
                <i class="fas fa-folder"></i>
                <span class="block-name">${highlightText(block.name, searchQuery)}</span>
            </h4>
            <i class="fas fa-chevron-up"></i>
        `;
        
        const unitsList = document.createElement('div');
        unitsList.className = 'units-list';
        unitsList.style.display = isExpanded ? 'block' : 'none';
        
        // Add units for this block
        block.units.forEach(unit => {
            const unitElement = createUnitElement(unit, block, subject);
            unitsList.appendChild(unitElement);
        });
        
        // Toggle block collapse/expand
        blockHeader.addEventListener('click', () => {
            const isCollapsed = blockHeader.classList.contains('collapsed');
            
            if (isCollapsed) {
                blockHeader.classList.remove('collapsed');
                unitsList.style.display = 'block';
            } else {
                blockHeader.classList.add('collapsed');
                unitsList.style.display = 'none';
            }
        });
        
        blockDiv.appendChild(blockHeader);
        blockDiv.appendChild(unitsList);
    } else {
        // Direct PDF block (like BEGLA-136 blocks)
        const pdfBlockDiv = document.createElement('div');
        pdfBlockDiv.className = 'pdf-block';
        
        const pdfPath = `./pdfs/1st_Semester/${subject.name}/${block.file}`;
        const displayName = highlightText(block.name, searchQuery);
        
        pdfBlockDiv.innerHTML = `
            <a href="${pdfPath}" target="_blank" class="pdf-link" data-path="${pdfPath}" data-name="${block.name} - ${subject.name}">
                <i class="far fa-file-pdf"></i>
                <span>${displayName}</span>
            </a>
            <div class="unit-actions">
                <button class="btn-view" title="View PDF" data-path="${pdfPath}" data-name="${block.name} - ${subject.name}">
                    <i class="fas fa-eye"></i>
                </button>
                <a href="${pdfPath}" download class="btn-download-small" title="Download PDF">
                    <i class="fas fa-download"></i>
                </a>
            </div>
        `;
        
        // Add click event to view button
        const viewBtn = pdfBlockDiv.querySelector('.btn-view');
        viewBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openPdfModal(pdfPath, `${block.name} - ${subject.name}`);
        });
        
        blockDiv.appendChild(pdfBlockDiv);
    }
    
    return blockDiv;
}

// Create a unit element
function createUnitElement(unit, block, subject) {
    const unitDiv = document.createElement('div');
    unitDiv.className = 'unit-item';
    
    // Construct the path to the PDF file
    // Handle the space in "Unit-1 .pdf" for BCS-012 Block-3
    const cleanFileName = unit.file.replace(/\s+\.pdf$/, '.pdf');
    const pdfPath = `./pdfs/1st_Semester/${subject.name}/${block.name}/${cleanFileName}`;
    
    const displayName = highlightText(unit.name, searchQuery);
    
    unitDiv.innerHTML = `
        <a href="${pdfPath}" target="_blank" class="unit-link" data-path="${pdfPath}" data-name="${unit.name} - ${block.name} - ${subject.name}">
            <i class="far fa-file-pdf"></i>
            <span>${displayName}</span>
        </a>
        <div class="unit-actions">
            <button class="btn-view" title="View PDF" data-path="${pdfPath}" data-name="${unit.name} - ${block.name} - ${subject.name}">
                <i class="fas fa-eye"></i>
            </button>
            <a href="${pdfPath}" download class="btn-download-small" title="Download PDF">
                <i class="fas fa-download"></i>
            </a>
        </div>
    `;
    
    // Add click event to view button
    const viewBtn = unitDiv.querySelector('.btn-view');
    viewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openPdfModal(pdfPath, `${unit.name} - ${block.name} - ${subject.name}`);
    });
    
    return unitDiv;
}

// Highlight search terms in text
function highlightText(text, query) {
    if (!query || query.trim().length < 2) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

// Search through PDFs
function searchPdfs(query) {
    searchQuery = query.toLowerCase().trim();
    
    // Update search info
    updateSearchInfo();
    
    // If query is too short, show all subjects
    if (searchQuery.length < 2) {
        loadSemester(currentSemester);
        return;
    }
    
    // Search through current semester
    const searchResults = {
        subjects: []
    };
    
    currentSemester.subjects.forEach(subject => {
        const subjectMatch = subject.name.toLowerCase().includes(searchQuery);
        let subjectHasMatch = subjectMatch;
        
        // Check blocks within this subject
        const matchingBlocks = [];
        
        subject.blocks.forEach(block => {
            const blockMatch = block.name.toLowerCase().includes(searchQuery);
            let blockHasMatch = blockMatch;
            
            // Check if block has units
            if (block.units) {
                // Check units within this block
                const matchingUnits = [];
                
                block.units.forEach(unit => {
                    const unitMatch = unit.name.toLowerCase().includes(searchQuery) || 
                                      unit.file.toLowerCase().includes(searchQuery);
                    
                    if (unitMatch) {
                        matchingUnits.push(unit);
                        blockHasMatch = true;
                        subjectHasMatch = true;
                    }
                });
                
                // If block has matching units, add it to results
                if (blockHasMatch) {
                    matchingBlocks.push({
                        ...block,
                        units: blockMatch ? block.units : matchingUnits
                    });
                }
            } else {
                // Direct PDF block
                const fileMatch = block.file.toLowerCase().includes(searchQuery);
                
                if (blockMatch || fileMatch) {
                    matchingBlocks.push(block);
                    subjectHasMatch = true;
                }
            }
        });
        
        // If subject has matching blocks, add it to results
        if (subjectHasMatch) {
            searchResults.subjects.push({
                ...subject,
                blocks: subjectMatch ? subject.blocks : matchingBlocks
            });
        }
    });
    
    // Display search results
    if (searchResults.subjects.length > 0) {
        contentTitle.textContent = `Search Results for "${query}"`;
        buildSubjects(searchResults.subjects, true);
        subjectsContainer.style.display = 'flex';
        emptyState.style.display = 'none';
    } else {
        contentTitle.textContent = `No results for "${query}"`;
        subjectsContainer.style.display = 'none';
        emptyState.style.display = 'block';
    }
}

// Update search info text
function updateSearchInfo() {
    if (searchQuery.length === 0) {
        searchInfo.textContent = 'Enter at least 2 characters to start searching';
    } else if (searchQuery.length === 1) {
        searchInfo.textContent = 'Enter at least 2 characters to start searching';
    } else {
        searchInfo.textContent = `Searching for: "${searchQuery}"`;
    }
}

// Open PDF in modal
function openPdfModal(pdfPath, title) {
    pdfTitle.textContent = title;
    pdfViewer.src = pdfPath;
    downloadPdf.href = pdfPath;
    
    // Set up open in new tab button
    openNewTab.onclick = () => {
        window.open(pdfPath, '_blank');
    };
    
    pdfModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
}

// Close PDF modal
function closePdfModal() {
    pdfModal.style.display = 'none';
    pdfViewer.src = '';
    document.body.style.overflow = 'auto';
}

// Expand all collapsible sections
function expandAll() {
    document.querySelectorAll('.subject-header.collapsed').forEach(header => {
        header.classList.remove('collapsed');
        header.nextElementSibling.style.display = 'block';
    });
    
    document.querySelectorAll('.block-header.collapsed').forEach(header => {
        header.classList.remove('collapsed');
        header.nextElementSibling.style.display = 'block';
    });
}

// Collapse all collapsible sections
function collapseAll() {
    document.querySelectorAll('.subject-header:not(.collapsed)').forEach(header => {
        header.classList.add('collapsed');
        header.nextElementSibling.style.display = 'none';
    });
    
    document.querySelectorAll('.block-header:not(.collapsed)').forEach(header => {
        header.classList.add('collapsed');
        header.nextElementSibling.style.display = 'none';
    });
}

// Set up event listeners
function setupEventListeners() {
    // Search input with debouncing
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        
        const query = searchInput.value;
        searchTimeout = setTimeout(() => {
            searchPdfs(query);
        }, 300);
    });
    
    // Clear search button
    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.focus();
        searchPdfs('');
    });
    
    // Expand all button
    expandAllBtn.addEventListener('click', expandAll);
    
    // Collapse all button
    collapseAllBtn.addEventListener('click', collapseAll);
    
    // Close modal button
    closeModal.addEventListener('click', closePdfModal);
    
    // Close modal when clicking outside
    pdfModal.addEventListener('click', (e) => {
        if (e.target === pdfModal) {
            closePdfModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && pdfModal.style.display === 'flex') {
            closePdfModal();
        }
    });
    
    // Prevent PDF links from navigating away (will be handled by modal)
    document.addEventListener('click', (e) => {
        if (e.target.closest('.unit-link') || e.target.closest('.pdf-link')) {
            e.preventDefault();
            const link = e.target.closest('a');
            const pdfPath = link.getAttribute('data-path');
            const pdfName = link.getAttribute('data-name');
            openPdfModal(pdfPath, pdfName);
        }
    });
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
