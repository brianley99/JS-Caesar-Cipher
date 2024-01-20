function expandThumnail(thumnailId, fullContentId){

    // Get values from the DOM
    let tumnailContent = document.getElementById(`${thumnailId}`).innerHTML;

    // Get modal to copy to
    let fullContent = document.getElementById(`${fullContentId}`);

    // Copy those values to the modal
    fullContent.innerHTML = tumnailContent;
}
