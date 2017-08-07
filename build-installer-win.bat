IF EXIST "_Install\" (
rmdir /Q /S _Install && yarn run dist
) ELSE (
yarn run dist
)