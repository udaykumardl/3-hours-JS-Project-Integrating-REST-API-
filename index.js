function handleFormSubmit(event) {
    event.preventDefault();
    const productname=event.target.productname.value
    const sellingprice=event.target.sellingprice.value
    const category=event.target.category.value

    const obj = {
    productname,
    sellingprice,
    category
  
    };
  
    axios.post("https://crudcrud.com/api/fd57f8642a9d4d7e9be763d67d1638ad/products", obj)
      .then((response) => {
        showProductOnScreen(response.data);
        console.log(response);
      })
      .catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>";
        console.log(err);
      });
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/fd57f8642a9d4d7e9be763d67d1638ad/products")
    .then((response) => {
        console.log(response);
        for (var i = 0; i < response.data.length; i++) {
            showProductOnScreen(response.data[i]);
        }
         
      })
      .catch((error) => {
        console.log(error);
      })
  });
  
  function showProductOnScreen(obj){
    document.getElementById('productname').value='';
    document.getElementById('sellingprice').value='';
    document.getElementById('category').value='';

    const parentNode=document.getElementById('productlist');

    const childnode=`<li id=${obj._id}> ${obj.productname}-${obj.sellingprice}-${obj.category} 
                    <button onclick=DeleteProduct('${obj._id}') >DeleteProduct</button>
                   

                    </li> `;
    parentNode.innerHTML=parentNode.innerHTML+childnode;
}
function editUserDetails(id,productname,sellingprice,category){

    document.getElementById('productname').value=productname;
    document.getElementById('sellingprice').value=sellingprice;
    document.getElementById('category').value=category;
    DeleteProduct(id)
}
  function DeleteProduct(id) {
    axios.delete(`https://crudcrud.com/api/fd57f8642a9d4d7e9be763d67d1638ad/products/${id}`)
      .then((res) => {
        removeProductFromScreen(id);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function removeProductFromScreen(id){
    const parentNode=document.getElementById('productlist')
    const ChildNodeToBeRemoved=document.getElementById(id)
    if(ChildNodeToBeRemoved){

        parentNode.removeChild(ChildNodeToBeRemoved)
    }
}

  
  