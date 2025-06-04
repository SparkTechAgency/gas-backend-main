import { Router } from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { userValidation } from './user.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constants';
import parseData from '../../middleware/parseData';
import fileUpload from '../../middleware/fileUpload';
import multer, { memoryStorage } from 'multer';

const router = Router();
const storage = memoryStorage();
const upload = multer({ storage });

router.post(
  '/create',
  upload.single('image'),
  parseData(),
  // validateRequest(userValidation?.guestValidationSchema),
  userController.createUser,
);

router.patch(
  '/update/:id',
  auth(USER_ROLE.admin, USER_ROLE.driver, USER_ROLE.user),
  upload.single('image'),
  parseData(),
  userController.updateUser,
);

router.patch(
  '/update-my-profile',
  auth(USER_ROLE.admin, USER_ROLE.sub_admin, USER_ROLE.user, USER_ROLE.driver),
  upload.single('image'),
  parseData(),
  userController.updateMyProfile,
);

router.delete(
  '/delete-my-account',
  auth(USER_ROLE.admin, USER_ROLE.driver, USER_ROLE.user),
  userController.deleteMYAccount,
);
router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.driver, USER_ROLE.user),
  userController.deleteUser,
);

router.get(
  '/my-profile',
  auth(USER_ROLE.admin, USER_ROLE.driver, USER_ROLE.user),
  userController.getMyProfile,
);

router.get('/:id', userController.getUserById);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.driver, USER_ROLE.user),
  userController.getAllUser,
);

export const userRoutes = router;
