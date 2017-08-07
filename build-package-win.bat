IF EXIST "_Install\" (
rmdir /Q /S _Install && yarn run pack
) ELSE (
yarn run pack
)