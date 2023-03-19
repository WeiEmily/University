const trapElement = document.querySelectorAll(".trapezium");
const triangleElement = document.getElementById("triangle");
const nums = document.querySelectorAll(".num");

let optStatus = "adult"; //inital the statue is for adult
//variables of two button
const opt1 = document.querySelector("#opt1Btn");
const opt2 = document.querySelector("#opt2Btn");



let childArr = [1, 2, 2, 4, 5, 5]; //child array
let adultArr = [2, 4, 3, 3, 4, 6]; //adult array

const plusBtu = document.querySelectorAll(".plus");
const minusBtu = document.querySelectorAll(".minus");

opt1.addEventListener("click", function () {
    if (optStatus === "adult") {
        for (let i = 0; i < childArr.length; i++) {
            if (i === 0) {
                trapElement.item(i).style.height = 150 + "px";
            }else if( i === 5) {
                trapElement.item(i).style.height = 120 + "px";
            }else{
                trapElement.item(i).style.height = 100 + "px";
            }
            nums.item(i).innerHTML = childArr[i];
            plusBtu[i].style.borderColor = "#000000";
            minusBtu[i].style.borderColor = "#000000";
            nums[i].style.borderColor = "#000000";
        }
    }
    optStatus = "child";
});


opt2.addEventListener("click", function () {
    if (optStatus === "child") {
        for (let i = 0; i < adultArr.length; i++) {
            if (i === 0) {
                trapElement.item(i).style.height = 150 + "px";
            }else if( i === 5) {
                trapElement.item(i).style.height = 120 + "px";
            }else{
                trapElement.item(i).style.height = 100 + "px";
            }
            nums.item(i).innerHTML = adultArr[i];
            plusBtu[i].style.borderColor = "#000000";
            minusBtu[i].style.borderColor = "#000000";
            nums[i].style.borderColor = "#000000";
        }
    }
    optStatus = "adult";
});



function cacuHeight() {
    let totalHeight = 0;
    trapElement.forEach((element) => {
        totalHeight += element.offsetHeight;
    });
    return totalHeight;
}

function updateTriangleHeight() {
    const totalHeight = cacuHeight();
    triangleElement.style.height = totalHeight + "px";
}
//initial
updateTriangleHeight();


for (let i = 0; i < nums.length; i++) {
    nums[i].addEventListener("DOMSubtreeModified", function () {
        const testNum = Number(nums[i].innerHTML);
        if (
            (optStatus === "adult" && testNum > adultArr[i]) ||
            (optStatus === "child" && testNum > childArr[i])
        ) {
            plusBtu[i].style.borderColor = "#cb4e2f";
            minusBtu[i].style.borderColor = "#cb4e2f";
            nums[i].style.borderColor = "#cb4e2f";
        } else if (
            (optStatus === "adult" && testNum === adultArr[i]) ||
            (optStatus === "child" && testNum === childArr[i])
        ) {
            plusBtu[i].style.borderColor = "#000000";
            minusBtu[i].style.borderColor = "#000000";
            nums[i].style.borderColor = "#000000";
        } else if (
            (optStatus === "adult" && testNum < adultArr[i]) ||
            (optStatus === "child" && testNum < childArr[i])
        ) {
            plusBtu[i].style.borderColor = "#5479c4";
            minusBtu[i].style.borderColor = "#5479c4";
            nums[i].style.borderColor = "#5479c4";
        }
    });
}


trapElement.forEach((element) => {
    const addButton = element.querySelector(".plus");
    const minusButton = element.querySelector(".minus");
    const nums = element.querySelector(".num");

    addButton.addEventListener("click", () => {
        let height = parseInt(element.offsetHeight, 10);
        height += 3;
        nums.innerHTML++;
        element.style.height = height + "px";
    });

    minusButton.addEventListener("click", () => {
        let height = parseInt(element.offsetHeight, 10);
        height -= 3;
        nums.innerHTML--;
        element.style.height = height + "px";
    });
});


const dateInput = document.getElementById('date-input');
const dateErrorMessage = document.getElementById('date-error-message');
const currData = document.getElementById('currData');

// add a eventListener keyup ，when user enter input check it
dateInput.addEventListener('keyup', function() {
    const value = this.value;
    if (!isValidDate(value)) {
        dateErrorMessage.textContent = 'invalid data format, please input again';
    } else {
        dateErrorMessage.textContent ='';
        currData.textContent = value;
    }
});

function isValidDate(dateString) {
    if (dateString.length !== 10) {
        return false;
    }
    const year = dateString.substring(0, 4);
    const month = dateString.substring(5, 7);
    const day = dateString.substring(8, 10);
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
        return false;
    }
    const date = new Date(year, month - 1, day);
    return (
        date.getFullYear() === Number(year) &&
        date.getMonth() === Number(month) - 1 &&
        date.getDate() === Number(day)
    );

}


//observe event
trapElement.forEach((element) => {
    new ResizeObserver(updateTriangleHeight).observe(element);
});






