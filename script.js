// firstlY access the boxes
let boxes = document.querySelectorAll(".box");
let rst_btn = document.querySelector("#rst-btn");
let new_btn = document.querySelector("#new-btn");
let msg_container = document.querySelector(".msg-container");
let msg = document.querySelector("#msg"); 

let turnO = true;
let count = 0;

const winPatterns = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msg_container.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO === true) {
            box.innerText = "O";
            turnO = false;
        }
        else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = chkWinner();
        if (count === 9 && !isWinner)
            draw();
    });
});

const draw = () => {
    msg.innerText = `Game was a Draw.`;
    msg_container.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msg_container.classList.remove("hide");
    disableBoxes();
};

const chkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
};

new_btn.addEventListener("click", resetGame);
rst_btn.addEventListener("click", resetGame);