
function play_audio_cls() {
    let audio=new Audio('assets/audio/click.mp3');
    audio.play();
}
function play_audio_btn(){
    let audio=new Audio('assets/audio/click2.mp3');
    audio.volume=0.8;
    audio.play();
}
function toggle_mode(){
    let main=document.getElementById("main");
    let dock=document.getElementById("dock");
    let classList=main.classList;
    let project=document.getElementById("projects");
    let sb=document.getElementById("social_bar");
    let audio=new Audio('assets/audio/click3.mp3');
    audio.volume=0.50;
    audio.play();
    if(Array.from(classList).includes('light-mode')){
        main.classList.remove('light-mode');
        dock.classList.remove('dark-mode','lightmode');
        main.classList.add('dark-mode');
        dock.classList.add('light-mode','darkmode');
        project.classList.add('darkmode_variant');
        sb.classList.add('dark_mode_nav');
        sb.classList.remove('light_mode_nav');
        project.classList.remove('lightmode_variant');
        document.getElementById("mode").innerHTML="sunny";
    }else{
         main.classList.add('light-mode');
        dock.classList.add('dark-mode','lightmode');
        main.classList.remove('dark-mode');
        sb.classList.remove('dark_mode_nav');
        sb.classList.add('light_mode_nav');
        dock.classList.remove('light-mode','darkmode');
         project.classList.add('lightmode_variant');
          project.classList.remove('darkmode_variant');
        document.getElementById("mode").innerHTML="dark_mode";
    }
}
async function on_load(){
    const bio=await load_data('data/data.json');
    document.getElementById("info").innerHTML = bio.bio;
    opening_anim('home','grid');
     await load_projects();
}
async function load_data(filename){
    let myObject = await fetch(filename);
    let data = await myObject.text();
    let final_data=JSON.parse(data);
    return final_data;
}
//animation
function opening_anim(id,desired_display="block",id2="",timer=450){
    setTimeout(()=>{
        let main_elem=document.getElementById(id);
        if(main_elem.style.display!=desired_display){
            main_elem.style.display=desired_display;
        }
        if(id2!=""){
            let target_elem=document.getElementById(id2);
            target_elem.classList.add("scroll_bar_noshow");
            target_elem.classList.remove("scroll_bar_show");
            target_elem.querySelectorAll("*").forEach((e)=>{
                e.style.opacity='0';});
            target_elem.style.display="none";
        }
        setTimeout(()=>{
           
            main_elem.classList.add("scroll_bar_show");
            main_elem.classList.remove("scroll_bar_noshow");
            main_elem.querySelectorAll("*").forEach((e)=>{
                e.style.opacity='1';});
           },timer);
    },100);
}
function home(){
    play_audio_btn();
    opening_anim('home','grid','projects');
}
function projects(){
    play_audio_btn();
    opening_anim('projects','block','home');
  //  set_offset();
}
function credits(){
    play_audio_btn();
    document.getElementById("credits").show();
    setTimeout(() => {
        document.getElementById("credits").classList.add("open");
    }, 50);
}
function dialog_close(){
    let e=document.getElementById("credits");
    e.classList.remove("open");
    e.classList.add("fade-anim");
    play_audio_cls();
    //void e.offsetWidth;
    setTimeout(()=>{
       e.close();
       e.classList.remove("fade-anim");
    },200);
}
const special_btn=document.querySelectorAll(".special_btn");
special_btn.forEach((e)=>{
    e.addEventListener('click',(event)=>{
        event.currentTarget.style.color="mediumseagreen";
        event.currentTarget.style.transform="scale(1.5)";
        special_btn.forEach((e2)=>{
            if(event.currentTarget!=e2){
                e2.style.removeProperty("color");
                e2.style.removeProperty("transform");
            }
        })
    });
});
async function load_projects(){
    let projects=await load_data('data/data.json');
    let project_data=projects.projects;
    let counter=0;
    let obj=[
        {
            name:"coming soon",
            link:"#"
        }
    ];
    let button_disabled=false;
    if(project_data.length==0){
        counter=1;
        button_disabled=true;
    }else{
        counter=project_data.length;
    }
    let current_obj;
    if(project_data.length==0){
        current_obj=obj;
    }
    else{
        current_obj=project_data;
    }
    for(let i=0;i<counter;i++){
            let div=document.createElement('div');
            let p=document.createElement('p');
            let button=document.createElement('button');
            div.classList.add('list_item');
            button.setAttribute('onclick',`window.open('${current_obj[i]['link']}')`);
            if(button_disabled){
                button.disabled=true;
                button.style.backgroundColor=' rgba(75, 75, 75, 0.67)';
                button.style.color=' rgb(0, 0, 0)';
                button.style.cursor="not-allowed";
            }
            button.innerText="Open";
            p.innerText=current_obj[i]['name'];
            document.getElementById("projects_container").appendChild(div);
            div.appendChild(p);
            div.appendChild(button);
    }
}