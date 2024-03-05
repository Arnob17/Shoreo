// /**
//  * @param {number[]} nums1
//  * @param {number[]} nums2
//  * @return {number}
//  */
// var findMedianSortedArrays = function(nums1, nums2) {
//     let main_array = [];

//     for (let x of nums1) {
//         main_array.push(x);
//     }

//     for (let x of nums2) {
//         main_array.push(x);
//     }

//     let sorted_array = main_array.sort(function (a, b) { return a - b });

//     let type;
//     function isEven(n) {
//         return (n % 2 == 0);
//     }

//     // if (isEven(main_array.length) == true) {
//     //     return console.log(main_array[(((main_array.length-1)/2) + (((main_array.length-1)/2)+1))/2]);
//     // } else {
//     //     return console.log(main_array[((main_array.length-1)+1)/2]);
//     // }

//     return isEven ? console.log(sorted_array[(((sorted_array.length-1)/2) + (((sorted_array.length-1)/2)+1))/2]) : console.log(sorted_array[((sorted_array.length-1)+1)/2]);
// };

// findMedianSortedArrays([1,3], [2])

class বাংলা {
    constructor(ইনপুট) {
        this.ইনপুট = ইনপুট;
    }
    হেলোওয়ার্ল্ড() {
        console.log(`${this.ইনপুট}, হেলোওয়ার্ল্ড!`);
    }
}

let বাংলা1 = new বাংলা('আমি অর্ণব');

বাংলা1.হেলোওয়ার্ল্ড();