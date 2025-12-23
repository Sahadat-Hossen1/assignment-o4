//api url
const ApiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const Container = document.getElementById("container");

const fetchApi = async (searchValue = "") => {
   Container.innerHTML=`<h1 class="text-center text-3xl text-red-700">Loading......</h1> `
  try {
    const res = await fetch(ApiUrl + searchValue);
    const data = await res.json();
    return data.meals;
  } catch (error) {
    console.log(error);
  }
};
//create curd
function createCurd(meals) {
  // console.log(meals);
  Container.innerHTML = "";
  if (!meals) {
    const h1 = document.createElement("h1");
    h1.classList.add("text-center", "text-red-500");
    h1.innerText = "No Meal Founded";
    Container.appendChild(h1);
    return;
  }

  meals.forEach((meal) => {
    const id = meal.idMeal;
    const meal_name = meal.strMeal;
    const meal_description = meal.strInstructions.slice(0, 80);
    const meal_img = meal.strMealThumb;
    const div = document.createElement("div");
    //  div.classList.add("grid","grid-cols-2")
    div.innerHTML = ` <div class=" shadow-2xl rounded-2xl mx-auto overflow-hidden">
                <!-- curd img -->
                <div>
                    <img src='${meal_img}' alt="card.img" class="rounded-2xl">
                </div>
                <!-- curd content -->
                <div class="pt-3 md:pt-4 px-2 ">
                    <h1 class="text-xl font-black">
                        ${meal_name}
                    </h1>
                    <p class=""> ${meal_description}</p>
                    
                    <div class="flex justify-end py-2">
                        <button onclick="openModal(${meal.idMeal})" class="text-xs bg-amber-400 hover:bg-amber-300 px-3 py-2 rounded-xl">VIEW
                            DETAILS</button>
                    </div>
                </div>
            </div>`;
    Container.appendChild(div);
  });
}
//for showing when page load or after refresh page
window.addEventListener("DOMContentLoaded", async function () {
  const meals = await fetchApi();
  createCurd(meals);
  // console.log(meals);
});
//for search
document
  .getElementById("submitInput")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    let input = document.getElementById("inputText").value;
    if (input === "") return;
    const meals = await fetchApi(input);
    createCurd(meals);
    document.getElementById("inputText").value = "";
  });
//for open the modal
async function openModal(id) {
  // console.log(id);
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await res.json();
  const meal = await data.meals[0];
  // console.log();

  const modal = document.getElementById("mealModal");
  modal.classList.remove("hidden");
  modal.innerHTML = `<div id="modalPosition" class="bg-white py-2 px-1  rounded-2xl shadow-2xl w-2/3 md:w-1/2  flex  flex-col items-center justify-center">
            <div class="flex-1 overflow-hidden">
                <img id="imgId" src="${meal.strMealThumb}" style=" width:100%;higth:300px " alt="meal_image" class="rounded-t-2xl">
            </div>
            <!-- modal contents -->
            <div class="flex-2 px-1 py-4">
                <h1 class="text-2xl font-bold">${meal.strMeal} </h1>
                <p class="text-lg">
                   ${meal.strInstructions.slice(0,200)}
                </p>
                <div class="flex justify-end pr-2">
                    <button onclick="closeModal()" id="close"
                        class="bg-amber-400 text-white hover:scale-110 py-2 px-4 rounded-xl">close</button>
                </div>
            </div>
        </div>`;
}

//for close the modal
function closeModal() {
  const modal = document.getElementById("mealModal");
  modal.classList.add("hidden");
  modal.innerHTML = "";
}
//for scroll to top
const scrollTopBtn=document.getElementById('scrollTopBtn');
window.addEventListener("scroll",function(){
  if(this.scrollY>30){
    scrollTopBtn.classList.remove("hidden")
  }else{
    scrollTopBtn.classList.add("hidden")
  }
})
scrollTopBtn.addEventListener("click",function(){
  window.scrollTo({
    top:0,
    behavior:"smooth"
  })
})