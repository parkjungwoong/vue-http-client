let util = {
    jsonToQueryString(json) {
        let qs = '?';

        if(this.isEmpty(json)) return qs;

        if(this.isNotJson(json)) return `${qs}${json}`;

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
            return value.length === 0 || value === '' || value === 'null' || value === 'undefined';
        } else {
            return value === undefined || value == null || value.length === 0;
        }
    },

    isNotEmpty(value) {
        return !this.isEmpty(value);
    },

    isJson(value) {
        return !(
            this.isEmpty(value)
            || typeof value === 'string'
            || typeof value === 'number'
        );
    },

    isNotJson(value) {
        return !this.isJson(value);
    }


};

export default util;
