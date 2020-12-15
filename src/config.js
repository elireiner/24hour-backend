module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    BIG_COMMERCE: `https://api.bigcommerce.com/stores/${process.env.STORE_ID}/v3`,
    APIGENIUS: `https://api.apigenius.io/products`,
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://example: dunder_mifflin@localhost/blogful',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://example: dunder_mifflin@localhost/blogful-test',
}