try {
    require('./package/index.ts')
} catch (e) {
    throw { error: e, message: 'Faild to load "shadow-utils"(ts)'}
    
} 