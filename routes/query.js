const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model('Query');
const Announcement = mongoose.model('Announcement');

const insign = ['leave', 'holiday', 'class', 'fees', 'accounts', 'laboratory', 'lab'];
const placement = [
    'job location',
    'jd',
    'job description',
    'ctc',
    'doj',
    'date of joining',
    'offer letter',
    'placed students',
    'dream',
    'super dream',
    'general',
    'elite',
    'history of arrears',
    'arrear',
    'post offer',
    'offer',
    'backlog',
    'interview',
    'online assessment2',
    'recruit',
    'panel',
    'core offer',
    'full time offer',
    'job vacancy',
    'roles',
    'hiring',
];
const trainingKey = [
    'ppo',
    'intern',
    'stipend',
    'intern date',
    'aptitude round',
    'coding round',
    'shortlisted',
    'visa',
    'passport',
    'payment',
    'international relations',
    'ut dallas',
    'student exchange program',
    'total fees',
    'scholarship',
    'career orientation',
    'accommodation',
    'hostel',
    'food',
    'timing',
    'nomination',
    'application',
    'university',
    'procedure',
    'winter camp',
    'summer camp',
    'residential',
    'program',
    'immersion',
    'enrol',
    'seats',
];

const getType = (sub = '', details = '') => {
    // const keywords = [...sub.toLowerCase().split(' '), ...details.toLowerCase().split(' ')];
    let type = '';
	let count = {};
	const str = `${sub.toLowerCase()} ${details.toLowerCase()}`;
    console.log({ str });
	insign.forEach(keyword => {
		if (str.includes(keyword)) {
			count['ARCHIVED'] = count['ARCHIVED'] ? count['ARCHIVED'] + 1 : 1;
		}
	});
	placement.forEach(keyword => {
		if (str.includes(keyword)) {
			count['PLACEMENT'] = count['PLACEMENT'] ? count['PLACEMENT'] + 1 : 1;
		}
	});
	trainingKey.forEach(keyword => {
		if (str.includes(keyword)) {
			count['TRAINING'] = count['TRAINING'] ? count['TRAINING'] + 1 : 1;
		}
	});
    // keywords.forEach(keyw => {
    //     console.log({ keyw });
    //     if (insign.includes(keyw)) {
	// 		count['ARCHIVED'] = count['ARCHIVED'] ? count['ARCHIVED'] + 1 : 1;
    //     }
    //     if (placement.includes(keyw)) {
	// 		count['PLACEMENT'] = count['PLACEMENT'] ? count['PLACEMENT'] + 1 : 1;
    //     }
    //     if (trainingKey.includes(keyw)) {
	// 		count['TRAINING'] = count['TRAINING'] ? count['TRAINING'] + 1 : 1;
    //     }
    // });
	let highestCount = 0;
	Object.keys(count).forEach(key => {
		if (count[key] > highestCount) {
			highestCount = count[key]
			type = key;
		}
	})
	console.log({ count, highestCount });
    return type;
};

router.get('/allpost', requireLogin, (req, res) => {
    const { status, type } = req.query;
    Post.find({ ...(status ? { status } : {}), ...(type ? { type } : {}) })
        .populate('raisedBy', '_id name')
        .populate('comments.postedBy', '_id name')
        .sort('-createdAt')
        .then(posts => {
            res.json({ posts });
        })
        .catch(err => {
            console.log(err);
        });
});

router.get('/announcement', requireLogin, (req, res) => {
    Announcement.find({})
        .populate('createdBy', '_id name')
        .sort('-createdAt')
        .then(posts => {
            res.json({ result: posts });
        })
        .catch(err => {
            console.log(err);
        });
});

router.post('/announcement', requireLogin, (req, res) => {
    const body = req.body;
    const post = new Announcement({
        ...body,
        createdBy: req.user,
    });
    post.save()
        .then(result => {
            res.json({ result });
        })
        .catch(err => {
            console.log(err);
        });
});

router.get('/query/stats', requireLogin, async (req, res) => {
    try {
        const [totalCount, completedCount, pendingCount, meetInPersonCount] = await Promise.all([
            Post.count().lean(),
            Post.count({ status: 'COMPLETED' }).lean(),
            Post.count({ status: 'PENDING' }).lean(),
            Post.count({ status: 'MEET IN PERSON' }).lean(),
        ]);
        res.send({
            counts: {
                totalCount,
                completedCount,
                pendingCount,
                meetInPersonCount,
            },
        });
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.put('/query/:id', requireLogin, (req, res) => {
    console.log({ status: req.body.status, id: req.params.id });
    Post.findByIdAndUpdate(req.params.id, {
        status: req.body.status,
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err });
        } else {
            res.json(result);
        }
    });
});

router.get('/query/:id', requireLogin, (req, res) => {
    console.log({ status: req.body.status, id: req.params.id });
    Post.findById(req.params.id)
        .populate('raisedBy', '_id name')
        .populate('comments.postedBy', '_id name')
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err });
            } else {
                res.json(result);
            }
        });
});

router.get('/getsubpost', requireLogin, (req, res) => {
    // if postedBy in following
    Post.find({ postedBy: { $in: req.user.following } })
        .populate('postedBy', '_id name')
        .populate('comments.postedBy', '_id name')
        .sort('-createdAt')
        .then(posts => {
            res.json({ posts });
        })
        .catch(err => {
            console.log(err);
        });
});

router.post('/createpost', requireLogin, (req, res) => {
    const body = req.body;

    const { subject, details } = body || {};
    const type = getType(subject, details);

    console.log({ type, subject, details });

    const post = new Post({
        ...body,
        type,
        raisedBy: req.user,
    });
    post.save()
        .then(result => {
            res.json({ post: result });
        })
        .catch(err => {
            console.log(err);
        });
});

router.get('/mypost', requireLogin, (req, res) => {
    Post.find({ raisedBy: req.user._id })
        .populate('raisedBy', '_id name')
        .then(mypost => {
            res.json({ posts: mypost });
        })
        .catch(err => {
            console.log(err);
        });
});

router.put('/like', requireLogin, (req, res) => {
    Post.findByIdAndUpdate(
        req.body.postId,
        {
            $push: { likes: req.user._id },
        },
        {
            new: true,
        },
    ).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err });
        } else {
            res.json(result);
        }
    });
});
router.put('/unlike', requireLogin, (req, res) => {
    Post.findByIdAndUpdate(
        req.body.postId,
        {
            $pull: { likes: req.user._id },
        },
        {
            new: true,
        },
    ).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err });
        } else {
            res.json(result);
        }
    });
});

router.put('/comment', requireLogin, (req, res) => {
    const comment = {
        text: req.body.text,
        postedBy: req.user._id,
    };
    Post.findByIdAndUpdate(
        req.body.postId,
        {
            $push: { comments: comment },
        },
        {
            new: true,
        },
    )
        .populate('comments.postedBy', '_id name')
        .populate('raisedBy', '_id name')
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err });
            } else {
                res.json(result);
            }
        });
});

router.delete('/deletepost/:postId', requireLogin, (req, res) => {
    Post.findOne({ _id: req.params.postId })
        .populate('raisedBy', '_id')
        .exec((err, post) => {
            if (err || !post) {
                return res.status(422).json({ error: err });
            }
            if (post.raisedBy._id.toString() === req.user._id.toString()) {
                post.remove()
                    .then(result => {
                        res.json(result);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        });
});

module.exports = router;
