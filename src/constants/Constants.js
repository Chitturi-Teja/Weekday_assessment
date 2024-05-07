//function to remove the selected option from the autocomplete popper
export function filteredOptions(arr,options){
    const firstListLabels = arr.map(item => item.label);
    const filteredSecondList = options.filter(item => !firstListLabels.includes(item.label));
    return filteredSecondList
}