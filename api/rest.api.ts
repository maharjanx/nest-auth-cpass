import { error } from "console";

const url:string='http://localhost:4005/'


const asyncGet=async (route:string)=>{
    try{
        const res= await fetch(url+route,{method:'GET'
    })
      const resp=await res.json();

      if(res.ok){
        return {data:resp,error:null}
      }else{
        return{data:null,error:resp}
      }
    }catch(e){
  return{data:null,error:e}
    }

}



const asyncPost=async (route:string,payload:any,headers?:{ "content-type":string})=>{
    try{
      // const form=new Form();
        const res= await fetch(url+route,{method:'POST',
        body: JSON.stringify(payload),
        headers:headers|| {
          "content-type": "application/json",
        },

    })
      const resp=await res.json();

      if(res.ok){
        return {data:resp,error:null}
      }else{
        return{data:null,error:resp}
      }
    }catch(e){
  return{data:null,error:e}
    }
  }

  const asyncPatch=async (route:string,payload:any)=>{
    try{
        const res= await fetch(url+route,{
          method:'PATCH',
          headers:{
            "content-type": "application/json"
          },
          body:JSON.stringify(payload),
    })
      const resp=await res.json();

      if(res.ok){
        return {data:resp,error:null}
      }else{
        return{data:null,error:resp}
      }
    }catch(e){
  return{data:null,error:e}
    }
  }

  const asyncDelete=async (route:string)=>{
    try{
        const res= await fetch(url+route,{method:'DELETE'
    })
      const resp=await res.json();

      if(res.ok){
        return {data:resp,error:null}
      }else{
        return{data:null,error:resp}
      }
    }catch(e){
  return{data:null,error:e}
    }
  }

  export {
    asyncDelete,
    asyncGet,
    asyncPatch,
    asyncPost
  }