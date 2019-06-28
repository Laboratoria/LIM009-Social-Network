import { deleteData } from '../firestore.js'
import { edit } from '../View_Controler.js/view-Controle.js'

export default (query, uid) => {
    const containerPost = document.querySelector('#containerPost')
    containerPost.innerHTML = '';
    
    
    query.forEach((doc) => { //data() del obj de los post
        if ((uid === doc.data().uidUsuario && doc.data().privacidad === 'Privado') || doc.data().privacidad === 'Público') {
            containerPost.innerHTML += `
            <form id='formPost' class='textareas'>
            <textarea id="textarea-${doc.id}" class="estilotextarea"  name="texto" spellcheck="true" data-id="${doc.id}" disabled="true">${doc.data().post}</textarea>  
            ${uid === doc.data().uidUsuario ? `<button type='button' class="delete fas fa-trash-alt" data-id="${doc.id}">Eliminar</button>
            <div class='divEdit'><button type='button' class='edit fas fa-edit' data-id="${doc.id}"></button></div>
            <div class='divSelect'><select id='estadoPost' data-select="${doc.id}" class='selctPrivacy'>
                    <option value = ${doc.data().privacidad} selected >${doc.data().privacidad}</option>
                    ${doc.data().privacidad === 'Privado' ? `<option value ='Público'>Público</option>` : `<option value ='Privado'>Privado</option>`}
                </select>
            </div>`
                    : `<p class='p_date'>Publicado por ${doc.data().name} el ${doc.data().weather}</p>`}
          </form>
          `
        } else {
        }
        document.querySelectorAll('.selctPrivacy').forEach(select => select.addEventListener('change', (e) => {
            edit('privacidad', e.target.value, e.target.dataset.select)
        }))
        document.querySelectorAll('.delete').forEach(btn =>
            btn.addEventListener('click', (e) => {
                deleteData(e.target.dataset.id)
            })
        )
        document.querySelectorAll('.edit').forEach(btn => 
            btn.addEventListener('click', (e) => {
                e.target.classList.remove('edit')
                const textarea = document.getElementById(`textarea-${e.target.dataset.id}`)
              
                if(e.target.className === 'fas fa-edit') {
                    textarea.disabled = false;
                    e.target.className= 'edit '
                    e.target.className+= 'fas fa-save'         
                } else {
                    edit('post', textarea.value, textarea.dataset.id)
                    e.target.classList.remove('edit')
                    textarea.disabled = true;
                    e.target.className= 'edit '
                    e.target.className += "fas fa-edit"
                }
            })
        )
    })
}