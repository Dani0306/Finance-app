import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export function formatToCOP(number) {
  return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
  }).format(number);
}


export function formatDate(isoDate) {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0'); 
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
}


export function defineHeight(goal, totalSpent){

  let percentage = (totalSpent / goal) * 100;
  
  if(percentage >= 100) return `100%`
  else return `${Math.round(percentage)}%`

}


export function defineCategory(category) {
  const categoryMap = {
    house: "House hold",
    all: "All transactions",
    food: "Food",
    personal: "Personal expenses",
    incoming: "Incoming",
    transport: "Transport", // Set default category explicitly
  };

  return categoryMap[category] || "Unknown Category"; // Default fallback
}



export function defineWidth(arr){

  const arr2 = arr.map(item => item.total);

  const biggest = arr2.reduce((acc, el) => (acc > el ? acc : el), arr2[0]);

  let widthArr = [];


  for (let i = 0; i < arr2.length; i++){
    let percentage = Math.round((arr2[i] / biggest) * 100);
    widthArr[i] = percentage.toString() + "%"
  }

  return widthArr

}



export function formatTitle(word){
  let arr = word.split(" ")
  for (let i = 0; i < arr.length; i++){
    arr[i] = arr[i].slice(0, 1).toUpperCase() + arr[i].slice(1, arr[i].length)
  }
  return arr.join(" ")

}
