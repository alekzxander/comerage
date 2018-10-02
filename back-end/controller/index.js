const jwt = require('jsonwebtoken');
const userModel = require('../models/users');
const articleModel = require('../models/articles');
const categoryArticleModel = require('../models/article_category');
const commentModel = require('../models/comments');
const categoryModel = require('../models/categories');
const bcrypt = require('bcrypt-nodejs');

// articleModel.hasMany(commentModel, { onDelete: 'CASCADE' });

const index = (app) => {
    app.get('/articles', async (req, res) => {
        const articles = await articleModel.findAll({
            where: {
                draft: false
            }
        });
        res.json({ articles })
    });
    app.get('/comments/:article_id', async (req, res) => {
        const comments = await commentModel.findAll({
            where: {
                articles_id: req.params.article_id
            }
        });
        res.json({ comments })
    })
    app.get('/categories/:article_id', async (req, res) => {
        const categoriesArticle = await categoryArticleModel.findAll({
            where: {
                articles_id: req.params.article_id
            }
        });
        const categories = categoriesArticle.map((cat) => {
            return cat.categories_id;
        })
        const categoriesName = await categoryModel.findAll({
            where: {
                id: categories
            }
        })
        res.json({ categoriesName })
    })
    app.post('/create-user', async (req, res) => {
        const password = userModel.generateHash(req.body.password);
        const user = {
            email: req.body.email,
            nickname: req.body.nickname,
            password
        };
        const existingUser = await userModel.find({
            where: {
                email: req.body.email
            }
        });
        if (!existingUser) {
            console.log(existingUser)
            const createUser = await userModel.create(user);
            const token = jwt.sign({ data: req.body.email, exp: Math.floor(Date.now() / 1000) + (60 * 60) }, 'secret');
            res.json({ token })
        } else {
            res.json({ response: req.body.email + ' already exist' })
        }
    });
    app.post('/login', async (req, res) => {
        const user = await userModel.find({
            where: {
                email: req.body.email
            }
        });
        bcrypt.compare(req.body.password, user.password, (err, pass) => {
            if (pass) {
                const token = jwt.sign({ data: req.body.email, exp: Math.floor(Date.now() / 1000) + (60 * 60) }, 'secret');
                return res.json({ response: `${user.nickname} is connected`, token })
            } else {
                return res.json({ response: 'password not valid' })
            }
        })
    });
    app.post('/create-article', verifyToken, async (req, res) => {
        const userAuth = checkToken(req.token);
        if (!userAuth) {
            res.status(401).json({ message: 'User not connected' })
        } else {
            const user = await userModel.find({
                where: {
                    email: userAuth.data
                }
            })
            const article = {
                body: req.body.body,
                draft: true,
                publication_date: Date.now(),
                users_id: user.id
            }
            const data = await articleModel.create(article);
            const category = {
                categories_id: req.body.categories,
                articles_id: data.id
            }
            req.body.categories.forEach(async (cat) => {
                const addCategory = await categoryArticleModel.create({ categories_id: cat, articles_id: data.id })
            })
            res.sendStatus(200)
        }
    });
    app.put('/update-article/:id', verifyToken, async (req, res) => {
        const userAuth = checkToken(req.token);
        if (!userAuth) {
            res.sendStatus(401)
        } else {
            const articleSelected = await articleModel.find({
                where: {
                    id: req.params.id
                }
            });
            const user = await userModel.find({
                where: {
                    email: userAuth.data
                }
            });
            if (user.id === articleSelected.users_id) {
                articleSelected.update({ body: req.body.body })
                res.sendStatus(200)
            } else {
                res.sendStatus(401)
            }
        }
    });
    app.get('/display-article/:article_id', async (req, res) => {
        const article = await articleModel.find({
            where: {
                id: req.params.article_id
            }
        });
        article.update({ draft: false })
        res.sendStatus(200);
    });
    app.get('/draft-article/:article_id', async (req, res) => {
        const article = await articleModel.find({
            where: {
                id: req.params.article_id
            }
        });
        article.update({ draft: true })
        res.sendStatus(200)
    });
    app.post('/add-comment/:article_id', verifyToken, async (req, res) => {
        const userAuth = checkToken(req.token);
        if (userAuth) {
            const user = await userModel.find({
                where: {
                    email: userAuth.data
                }
            });
            const article = await articleModel.find({
                where: {
                    id: req.params.article_id
                }
            });
            const comment = {
                body: req.body.body,
                publication_date: Date.now(),
                users_id: user.id,
                articles_id: article.id
            }
            const commentCreated = await commentModel.create(comment)
            res.json({ message: user, commentCreated })
        }
    });
    app.get('/delete-article/:id', verifyToken, async (req, res) => {
        jwt.verify(req.token, 'secret', async (err, authData) => {
            if (err) {
                res.sendStatus(401)
            } else {
                const articleSelected = await articleModel.find({
                    where: {
                        id: req.params.id
                    }
                });
                if (articleSelected) {
                    const user = await userModel.find({
                        where: {
                            email: authData.data
                        }
                    });
                    if (user.id === articleSelected.users_id) {
                        const articleCategory = await categoryArticleModel.findAll({
                            where: {
                                articles_id: articleSelected.id
                            }
                        });
                        const comments = await commentModel.findAll({
                            where: {
                                articles_id: req.params.id
                            }
                        });
                        comments.forEach((ca) => {
                            ca.destroy();
                        })
                        articleCategory.forEach((ac) => {
                            ac.destroy();
                        })
                        articleSelected.destroy();
                        res.sendStatus(200)
                    }
                } else {
                    res.sendStatus(401)
                }
            }
        });
    });
    function verifyToken(req, res, next) {
        const bearerHeader = req.headers['authorization'];
        if (bearerHeader) {
            req.token = bearerHeader;
            next();
        } else {
            res.sendStatus(401)
        }
    }
    function checkToken(token) {
        return jwt.verify(token, 'secret');
    }
};

module.exports = index;