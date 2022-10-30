const elListUser = document.querySelector('.user-list');
const elListPost = document.querySelector('.post-list');
const elListCom = document.querySelector('.com-list');

// userlani chiqarib oldik 

const userResult = (array,node) => {
   const itemFragment = document.createDocumentFragment()
   array.forEach((arr) => {
      newItem = document.createElement('li');
      newTitle = document.createElement('h2');
      newTitle2 = document.createElement('h3');
      newEmail = document.createElement('a');
      newAdres = document.createElement('address');
      newLocatsa = document.createElement('a');
      newPhone = document.createElement('a');
      newSite = document.createElement('a');
      newText = document.createElement('p');
      newText1 = document.createElement('p');
      newText2 = document.createElement('p');
   
      newItem.setAttribute('class', 'item-post');
      newItem.dataset.Id = arr.id;

      newTitle.textContent = arr.name;
      newTitle2.textContent = arr.username;
      newEmail.textContent = 'Email';
      newAdres.textContent = `${arr.address.street} ${arr.address.suite} ${arr.address.city} ${arr.address.zipcode}`;
      newLocatsa.textContent = 'Lacatsa';
      newPhone.textContent = 'Phone number';
      newSite.textContent = 'Website';
      newText.textContent = `Company name : ${arr.company.name}`;
      newText1.textContent = `Company catch : ${arr.company.catchPhrase}`;
      newText2.textContent = `Company bs : ${arr.company.bs}`;

      newEmail.href = arr.email;
      newLocatsa.href = `${arr.address.geo.lat}${arr.address.geo.lng}`;
      newPhone.href = arr.phone;
      newSite.href = arr.website;


      newItem.appendChild(newTitle)
      newItem.appendChild(newTitle2)
      newItem.appendChild(newText)
      newItem.appendChild(newText1)
      newItem.appendChild(newText2)
      newItem.appendChild(newAdres)
      newItem.appendChild(newLocatsa)
      newItem.appendChild(newPhone)
      newItem.appendChild(newSite)
      newItem.appendChild(newEmail)
      itemFragment.appendChild(newItem)
   })
   node.appendChild(itemFragment)
}

async function getTodo() {
	try {
		const res = await fetch('https://jsonplaceholder.typicode.com/users', {
			method: 'Get',
		});
		const data = await res.json();
      userResult(data, elListUser)
	} catch (error) {
		console.log(error);
	}
}
getTodo();

// userlani chiqarib boldik 


// postlani chiqardik 

const userPost = (array,node) => {
   const itemFragment = document.createDocumentFragment()
   node.innerHTML = ''
   array.forEach((arr) => {
      newItem = document.createElement('li')
      newTitle = document.createElement('h3')
      newText = document.createElement('p')
   
      newItem.setAttribute('class', 'item-coment');
      newItem.dataset.Id = arr.id;
      newTitle.textContent = arr.title;
      newText.textContent = arr.body;
   
      newItem.appendChild(newTitle)
      newItem.appendChild(newText)
      itemFragment.appendChild(newItem)
   })
   node.appendChild(itemFragment)
}

elListUser.addEventListener('click', function (evt) {
	if (evt.target.matches('.item-post')) {
      async function getuserPost() {
         try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${evt.target.dataset.Id}`,{
               method: 'Get',
            });
            const data = await res.json();
            userPost(data, elListPost)
         } catch (error) {
            console.log(error);
         }
      }
      getuserPost()
	}

});

// postlani chiqarib boldik


const userComment = (array,list) => {
   const itemFragments = document.createDocumentFragment()
   list.innerHTML = ''
   array.forEach((com) => {
      newItem = document.createElement('li')
      newTitle2 = document.createElement('h3')
      newEmail4 = document.createElement('a')
      newText5 = document.createElement('p')
   
      newTitle2.textContent = com.name;
      newEmail4.textContent = 'Email';
      newText5.textContent = com.body;

      newEmail4.href = com.email
   
      newItem.appendChild(newTitle2)
      newItem.appendChild(newText5)
      newItem.appendChild(newEmail4)
      itemFragments.appendChild(newItem)
   })
   list.appendChild(itemFragments)
}

elListPost.addEventListener('click', function (evt) {
	if (evt.target.matches('.item-coment')) {
      async function getComment() {
         try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${evt.target.dataset.Id}`,{
               method: 'Get',
            });
            const data = await res.json();
            console.log(data);
            userComment(data, elListCom)
         } catch (error) {
            console.log(error);
         }
      }
      getComment()
	}
});