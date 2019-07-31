(function(){
    document.getElementById('form').addEventListener("submit",(e,data)=>{
        e.preventDefault();
        const name = document.getElementById('name').value;
        const password = document.getElementById('password').value;
        
        const formData = new FormData();
        formData.append('username',name);
        formData.append('password',password)

        fetch("http://localhost:5000/user",{
            method:"POST",
            mode: "cors",
            body:formData
        })
        .then(res=>res.json())
        .then(data=>{
            document.getElementById("message").textContent = data.status;
        })
        .catch(err=>console.log(err));
    })
})()