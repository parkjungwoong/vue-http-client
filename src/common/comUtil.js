let util = {
    jsonToQueryString(json) {
        let qs = '?';
        try {
            let len = Object.keys(json).length-1;
            Object.keys(json).forEach((key,i) => {
                qs += i !== len ? `${key}=${json[key]}&` : `${key}=${json[key]}`;
            });
        } catch (e) {
            throw e;
        }

        return qs;
    }
};

export default util;
