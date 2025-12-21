//api url
const ApiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const Container = document.getElementById("container");

const fetchApi = async (searchValue = "") => {
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
  console.log(meals);
  Container.innerHTML = "";
  if (!meals) {
    const h1 = document.createElement("h1");
    h1.classList.add("text-center", "text-red-500");
    h1.innerText = "No Meal Founded";
    Container.appendChild(h1);
  }

  meals.forEach((meal) => {
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
                        <button class="text-xs bg-amber-400 hover:bg-amber-300 px-3 py-2 rounded-xl">VIEW
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
