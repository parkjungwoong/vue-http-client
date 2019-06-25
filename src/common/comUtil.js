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
    },

    isEmpty(value) {
        if(typeof value === 'string'){
            value = value.trim();
            return value.length === 0 || value === '' || value === 'null';
        } else {
            return value === undefined || value == null || value.length === 0;
        }
    }

    , isNotEmpty(value) {
        return !this.isEmpty(value);
    }
};

export default util;
