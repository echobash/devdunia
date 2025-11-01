const container = document.getElementById('bars-container');
const description = document.getElementById('description');
let values = [];

/* Function to generate random bars */
function generateBars(num = 30) {
  container.innerHTML = '';
  values = [];
  for (let i = 0; i < num; i++) {
    const height = Math.floor(Math.random() * 300) + 50;
    values.push(height);
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${height}px`;
    container.appendChild(bar);
  }
  description.textContent = "New array generated. Choose a sorting algorithm to visualize!";
}

/* Sorting algorithm descriptions */
const algoDescriptions = {
  bubble: "🫧 Bubble Sort repeatedly compares adjacent elements and swaps them if they are in the wrong order. With each pass, the largest element 'bubbles' up to the end of the array.",
  selection: "🔍 Selection Sort finds the smallest element in the unsorted part of the list and places it at the beginning. It repeats this process until the entire array is sorted.",
  insertion: "📥 Insertion Sort builds the sorted array one element at a time by inserting each new element into its correct position among the already sorted ones.",
  merge: "🔗 Merge Sort divides the array into halves, recursively sorts them, and merges the sorted halves. It’s a highly efficient divide-and-conquer algorithm.",
  quick: "⚡ Quick Sort chooses a pivot element and partitions the array so that elements smaller than the pivot go to one side, and larger ones to the other. It then recursively sorts the partitions."
};

/* Handles which sort to run */
async function runSort(type) {
  description.textContent = algoDescriptions[type];
  switch (type) {
    case 'bubble': await bubbleSort(); break;
    case 'selection': await selectionSort(); break;
    case 'insertion': await insertionSort(); break;
    case 'merge': await mergeSort(values, 0, values.length - 1); break;
    case 'quick': await quickSort(values, 0, values.length - 1); break;
  }
  description.textContent += " ✅ Sorting complete!";
}

/* Bubble Sort visualization */
async function bubbleSort() {
  const bars = document.querySelectorAll('.bar');
  for (let i = 0; i < values.length - 1; i++) {
    for (let j = 0; j < values.length - i - 1; j++) {
      bars[j].style.background = '#ff6b6b';
      bars[j + 1].style.background = '#ff6b6b';
      if (values[j] > values[j + 1]) {
        [values[j], values[j + 1]] = [values[j + 1], values[j]];
        bars[j].style.height = `${values[j]}px`;
        bars[j + 1].style.height = `${values[j + 1]}px`;
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      bars[j].style.background = '#ffdd59';
      bars[j + 1].style.background = '#ffdd59';
    }
  }
}

/* Selection Sort visualization */
async function selectionSort() {
  const bars = document.querySelectorAll('.bar');
  for (let i = 0; i < values.length; i++) {
    let minIdx = i;
    bars[i].style.background = '#34ace0';
    for (let j = i + 1; j < values.length; j++) {
      if (values[j] < values[minIdx]) minIdx = j;
    }
    [values[i], values[minIdx]] = [values[minIdx], values[i]];
    bars[i].style.height = `${values[i]}px`;
    bars[minIdx].style.height = `${values[minIdx]}px`;
    await new Promise(resolve => setTimeout(resolve, 100));
    bars[i].style.background = '#ffdd59';
  }
}

/* Insertion Sort visualization */
async function insertionSort() {
  const bars = document.querySelectorAll('.bar');
  for (let i = 1; i < values.length; i++) {
    let key = values[i];
    let j = i - 1;
    while (j >= 0 && values[j] > key) {
      values[j + 1] = values[j];
      bars[j + 1].style.height = `${values[j + 1]}px`;
      j--;
      await new Promise(resolve => setTimeout(resolve, 70));
    }
    values[j + 1] = key;
    bars[j + 1].style.height = `${key}px`;
  }
}

/* Merge Sort visualization */
async function mergeSort(arr, l, r) {
  if (l >= r) return;
  const mid = Math.floor((l + r) / 2);
  await mergeSort(arr, l, mid);
  await mergeSort(arr, mid + 1, r);
  await merge(arr, l, mid, r);
}

/* Merge helper */
async function merge(arr, l, m, r) {
  const left = arr.slice(l, m + 1);
  const right = arr.slice(m + 1, r + 1);
  let i = 0, j = 0, k = l;
  const bars = document.querySelectorAll('.bar');

  while (i < left.length && j < right.length) {
    bars[k].style.background = '#1dd1a1';
    await new Promise(resolve => setTimeout(resolve, 80));
    if (left[i] <= right[j]) {
      arr[k] = left[i];
      bars[k].style.height = `${arr[k]}px`;
      i++;
    } else {
      arr[k] = right[j];
      bars[k].style.height = `${arr[k]}px`;
      j++;
    }
    k++;
  }

  while (i < left.length) {
    arr[k] = left[i];
    bars[k].style.height = `${arr[k]}px`;
    i++; k++;
  }
  while (j < right.length) {
    arr[k] = right[j];
    bars[k].style.height = `${arr[k]}px`;
    j++; k++;
  }
}

/* Quick Sort visualization */
async function quickSort(arr, low, high) {
  if (low < high) {
    const pi = await partition(arr, low, high);
    await quickSort(arr, low, pi - 1);
    await quickSort(arr, pi + 1, high);
  }
}

/* Partition helper */
async function partition(arr, low, high) {
  const pivot = arr[high];
  const bars = document.querySelectorAll('.bar');
  let i = low - 1;
  for (let j = low; j < high; j++) {
    bars[j].style.background = '#e67e22';
    await new Promise(resolve => setTimeout(resolve, 60));
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      bars[i].style.height = `${arr[i]}px`;
      bars[j].style.height = `${arr[j]}px`;
    }
    bars[j].style.background = '#ffdd59';
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  bars[i + 1].style.height = `${arr[i + 1]}px`;
  bars[high].style.height = `${arr[high]}px`;
  return i + 1;
}

/* Generate bars when page loads */
generateBars();
