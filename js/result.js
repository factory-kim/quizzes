import { getResultInfo, getImagePath } from './util.js';

// Get references to the HTML elements
const typePretext = document.getElementById('typePretext');
const typeName = document.getElementById('typeName');
const typeImg = document.getElementById('typeImg')

const productPretext = document.getElementById('productPretext');
const productList = document.getElementsByClassName('product')

const bestImg = document.getElementById('bestImg')
const worstImg = document.getElementById('worstImg')

const retryButton = document.getElementById('retryButton')

// Sample questions and question numbers
var test_id = null
var lan = null
var type = null

var result_info =  null

// Util
function findValueByKey(array, keyToFind, valueToFind) {
    for (const item of array) {
        if (item[keyToFind] === valueToFind) {
            return item;
        }
    }
    return null; // Return null if the key-value pair is not found
}

function assertResultInfo() {
    if (result_info == null) {
        console.log("Error at getting result data")
    }
}

// Setup
function getProductInfoByIndex(product_idx, product_info) {
    return product_idx.map((idx) => {
        // Check if idx is valid (within the range of the product_info array)
        if (idx >= 1 && idx <= product_info.length) {
            return product_info[idx - 1]; // Adjust index to start from 0
        } else {
            return null; // Return null for invalid indices
        }
    });
}

function setupType(info) {
    const item = findValueByKey(info.type_info, 'type', type)

    typePretext.innerText = info.type_pretext
    typeName.innerText = item.name
    typeImg.src = getImagePath(item.img)
}

function setupProduct(info) {
    const type_item = findValueByKey(info.type_info, 'type', type)

    productPretext.innerText = info.product_pretext

    const product_idx = type_item.product_idx
    const selected_products = getProductInfoByIndex(product_idx, info.product_info);

    for (const [index, product] of Object.entries(productList)) {
        const product_name = product.querySelector('.product-name');
        const product_description = product.querySelector('.product-description');
        const img = product.querySelector('img')

        product_name.innerText = selected_products[index].name
        product_description.innerText = selected_products[index].description
        img.src = getImagePath(selected_products[index].img)
    }
}

function setupBestWorst(info) {
    const item = findValueByKey(info.type_info, 'type', type)

    const best_img_src = findValueByKey(info.type_info, 'type', item.best).img
    const worst_img_src= findValueByKey(info.type_info, 'type', item.worst).img

    bestImg.src = getImagePath(best_img_src)
    worstImg.src = getImagePath(worst_img_src)
}

function setupShare() {
    setupCopyUrl()
}

function setupShareToX() {
}

function setupCopyUrl() {
    document.addEventListener('DOMContentLoaded', function () {
        const copyButton = document.getElementById('copy-url-button');

        copyButton.addEventListener('click', function () {
            const urlValue = copyButton.getAttribute('value');
            const protocol = window.location.protocol; // e.g., "http:" or "https:"
            const hostname = window.location.hostname; // e.g., "www.example.com"
            const port = window.location.port; // e.g., "80" or "443" (if not specified, this will be an empty string)

            // Combine the protocol, hostname, and port to create the root address
            const rootAddress = `${protocol}//${hostname}${port ? `:${port}` : ''}`;
            const urlToCopy = `${rootAddress}/pages${urlValue}`;

            // Create a temporary text area element
            const textArea = document.createElement('textarea');
            textArea.value = urlToCopy;

            // Add the text area to the document
            document.body.appendChild(textArea);

            // Select the text within the text area
            textArea.select();

            try {
                // Copy the selected text to the clipboard
                document.execCommand('copy');
                console.log('URL copied to clipboard:', urlToCopy);
            } catch (err) {
                console.error('Failed to copy URL:', err);
            } finally {
                // Remove the temporary text area
                document.body.removeChild(textArea);
            }
        });
    });
}


function addEventStartButton(info) {
    retryButton.innerText = info.retry_pretext
    retryButton.addEventListener("click", function(e){
        window.location.href = "start.html"
    });
}

function setupResultInfo() {
    result_info = getResultInfo(test_id, lan)
}

function receiveDataFromPreviousPage() {
    test_id = window.location.search.substring(1).split("&")[0].split("=")[1];
    lan = window.location.search.substring(1).split("&")[1].split("=")[1];
    type = window.location.search.substring(1).split("&")[2].split("=")[1];
}

function init() {
    receiveDataFromPreviousPage()
    setupResultInfo(test_id, lan)

    assertResultInfo()

    setupType(result_info)
    setupProduct(result_info)
    setupBestWorst(result_info)
    setupShare()
    addEventStartButton(result_info)
}

init();
