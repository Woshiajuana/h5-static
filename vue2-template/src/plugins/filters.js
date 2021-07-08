
import * as filters from 'src/utils/filters'

export default {
    install (Vue) {
        Object.keys(filters).forEach(key => {
            Vue.filter(key, filters[key]);
        });
    }
}
