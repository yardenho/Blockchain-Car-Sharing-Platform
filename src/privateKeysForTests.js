export let privateKeys = [
    "kjbk4545gdfgdgggdege",
    "gerrg1451gregb",
    "brtbrb465515bretber",
    "wefw555gkiyuju666utjnrfrhb",
    "fdvdvdfb44bdbd3bdb5",
    "bddrghukioo2uyju22jtnef",
];
export let index = 0;

export const increaceIndex = () => {
    console.log(privateKeys.length);
    console.log(index);

    if (index + 1 <= privateKeys.length) {
        index = index + 1;
        return index;
    } else {
        return null;
    }
};
