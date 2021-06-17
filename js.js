// Get the modal
var modal = document.getElementById("tmodal");
var modlt = document.getElementById("modal_cont");
// Get the button that opens the modal
var btn = document.getElementById("opgif");
// When the user clicks the button, open the modal
var visx = document.getElementById("deletet"); //x icon
let isloading= false;
let gifs=[];
btn.onclick = function () {
  
  modal.style.display = "block";
  document.getElementById("disply_load").innerHTML = "";
  document.getElementById("searcht").value="";
  visx.style.visibility = "hidden";  
  GIFAPI("");
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {  
    document.getElementById("disply_load").innerHTML = "";
    modal.style.display = "none";
    
  }
};
//console.log("ff");
///go to search
document.getElementById("searcht").addEventListener("keyup", searchfunc);
let t=0;
function searchfunc() { page=1;
  document.getElementById("disply_load").innerHTML = "";
  var x = document.getElementById("searcht").value;
  //search on x gif 
  //visible the x icon
  if (x == "") {visx.style.visibility = "hidden";GIFAPI("");}
  else {
    visx.style.visibility = "visible";
    GIFAPI(x);
  console.log(x);
  }
}
///on clik x clear
visx.onclick = function () {
  document.getElementById("searcht").value = "";
  visx.style.visibility = "hidden";
  GIFAPI("");
};
let page=1;
//here go Giphy api to get the key from giphy developer websile 
function GIFAPI(sx){
  isloading=true;
  page=1;
  document.getElementById("disply_gif").innerHTML = "";
  var gif_api= "iI0SXrNLP7CjxfM8a1azBmBbW0XXn6wb";
  var gif_url= `https://api.giphy.com/v1/gifs/search?q=${sx}&rating=g&api_key=${gif_api}`;
  if(sx==""||(sx.indexOf(' ') >= 0))
  gif_url= `https://api.giphy.com/v1/gifs/trending?rating=g&api_key=${gif_api}`;
///fetch the gif url t

fetch(gif_url).then(resp=>resp.json()//response
  )
  .then(cont=>{//handel th data,pagination, meta
    console.log(cont);
    //console.log('META',cont.data[0]);
    //setgifs(conts.data); 
    renderGifs();
    gifs=cont.data;
    setTimeout(function(){
      isloading=false;
      console.log(page);renderGifs();
  }, 1100);
  })  
  .catch(er=>{
    console.error(er);
  })        
}

function renderGifs(){
  // show the loading  or the gifs
  if(isloading) {
    document.getElementById("disply_load").innerHTML = "";
    var load= document.createElement('load');
    var img= document.createElement('img');
    img.src= ("load1t.GIF");
    img.width=280;
    img.height=220;
    img.alt="Loading gif";
    load.appendChild(img);
    load.style.margin="110px";
    let out=document.querySelector('.disply_load');
    out.insertAdjacentElement('beforeend',load);
   }
else{  
  document.getElementById("disply_load").innerHTML = "";
  var slicegifs= gifs.slice((page-1)*5,page*5); //consol.log(" pp");
  slicegifs.map(gif=>(  
    getGif(gif)
  ));
 }
}

function getGif(gif){//isloading=false;
  
  var fig= document.createElement('figure');
    var img= document.createElement('img');
    img.src=gif.images.downsized.url;
    //fixed the width
    img.width=500;
    
    img.height=gif.images.downsized.height*(0.82);//reduce the height
    img.alt=gif.title;
    //fc.textContent=cont.data[0].title
    fig.appendChild(img);
   // fig.appendChild(fc);
    let out=document.querySelector('.disply_gif');
    out.insertAdjacentElement('beforeend',fig);
    //var imgp=images.fixed_height.url;
    //img.setAttribute("src",imgp);
    //document.body.appendChild(img);
    img.onclick=(()=>{
      console.log(img.alt);})
}

function showload(){
  document.getElementById("disply_load").innerHTML = "";
    var load= document.createElement('load');
    var img= document.createElement('img');
    img.src= ("load1t.GIF");
    img.width=280;
    img.height=220;
    img.alt="Loading gif";
    load.appendChild(img);
    load.style.margin="110px";
    let out=document.querySelector('.disply_load');
    out.insertAdjacentElement('beforeend',load);
    setTimeout(function(){
        //nextpage
        renderGifs();
  }, 1000)
}
/////////////infinite scroll
let sl=0;
//modlt.scrollIntoView();console.log(modlt.scrollTop+"jj")
modlt.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight} = modlt;
  if (scrollTop+clientHeight >= scrollHeight-1) {
    setTimeout(function(){
      sl=0;}, 1000)
    //sh=sh+clientHeight;
    if(page<=(gifs.length/5) && sl==0 ) {
      sl=1;
      page++;
      console.log("scr"+page);
      // show the loading 
       showload();}
}
}//,{ passive: true }
);