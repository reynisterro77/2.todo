const addForm=document.querySelector('.add');
const ullist=document.querySelector('.list');
const searchInput=document.querySelector('.search input');
const updateDiv=document.querySelector('.update');
const updateForm=document.querySelector('.updateForm');


const generateTemplate=todo=>{
    const html=`
    <li>
    <span>${todo}</span>
    <div>
    <i class="uil uil-edit"></i>
    <i class="uil uil-trash-alt"></i>
    </div>
</li>
    `;
    ullist.innerHTML+=html;
}

addForm.addEventListener('submit',e=>{
    e.preventDefault();//from yenilemesini kaldırır
    const todo=addForm.inputAdd.value.trim();//inputtaki value alıyorum ve trimle başındaki ve sonundaki boşlukları yok ediytorum
    if (todo.length){
        generateTemplate(todo);//input valuesini fonksiyonla gönderiyorum
        addForm.reset();//input valuesini temizler
        addForm.inputAdd.focus();
    }
})



ullist.addEventListener('click',e=>{
    if (e.target.classList.contains('uil-trash-alt')){
        e.target.parentElement.parentElement.remove();
    }
    if (e.target.classList.contains('uil-edit')){

            updateDiv.style.display='grid';

        const todo=e.target.parentElement.parentElement.querySelector('span').innerText;
        updateForm.updateInput.value=todo;

        updateForm.addEventListener('submit',e=>{
            e.preventDefault();
            e.stopPropagation();
            const updateInput=updateForm.updateInput.value.trim();
            e.target.parentElement.parentElement.querySelector('span').textContent=updateInput;
        })
    }


})

const filterTodos=term=>{
    Array.from(ullist.children)
        .filter(todo=>!todo.textContent.toLowerCase().includes(term))
        .forEach(todo=>todo.classList.add('filtered'));

    Array.from(ullist.children)
        .filter(todo=>todo.textContent.includes(term))
        .forEach(todo=>todo.classList.remove('filtered'));
}



searchInput.addEventListener('keyup',()=>{
    const term=searchInput.value.trim().toLowerCase();
    filterTodos(term);
});

