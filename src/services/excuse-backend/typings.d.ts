declare namespace API {
  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseListTagDTO_ = {
    code?: number;
    data?: TagDTO[];
    message?: string;
  };

  type BaseResponseLoginUserVO_ = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseMapStringObject_ = {
    code?: number;
    data?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePagePicture_ = {
    code?: number;
    data?: PagePicture_;
    message?: string;
  };

  type BaseResponsePagePictureVO_ = {
    code?: number;
    data?: PagePictureVO_;
    message?: string;
  };

  type BaseResponsePageTag_ = {
    code?: number;
    data?: PageTag_;
    message?: string;
  };

  type BaseResponsePageTagVO_ = {
    code?: number;
    data?: PageTagVO_;
    message?: string;
  };

  type BaseResponsePageUser_ = {
    code?: number;
    data?: PageUser_;
    message?: string;
  };

  type BaseResponsePageUserVO_ = {
    code?: number;
    data?: PageUserVO_;
    message?: string;
  };

  type BaseResponsePictureVO_ = {
    code?: number;
    data?: PictureVO;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseTagVO_ = {
    code?: number;
    data?: TagVO;
    message?: string;
  };

  type BaseResponseUser_ = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type checkUsingGETParams = {
    /** echostr */
    echostr?: string;
    /** nonce */
    nonce?: string;
    /** signature */
    signature?: string;
    /** timestamp */
    timestamp?: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type getPictureVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getTagVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type LoginUserVO = {
    createTime?: string;
    editTime?: string;
    id?: number;
    token?: string;
    updateTime?: string;
    userAvatar?: string;
    userEmail?: string;
    userGender?: number;
    userName?: string;
    userPhone?: string;
    userProfile?: string;
    userRole?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PagePicture_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Picture[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PagePictureVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: PictureVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageTag_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Tag[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageTagVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: TagVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUser_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: User[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type Picture = {
    category?: string;
    createTime?: string;
    editTime?: string;
    id?: number;
    introduction?: string;
    isDelete?: number;
    name?: string;
    picFormat?: string;
    picHeight?: number;
    picScale?: number;
    picSize?: number;
    picWidth?: number;
    reviewMessage?: string;
    reviewStatus?: number;
    reviewTime?: string;
    reviewerId?: number;
    tags?: string;
    updateTime?: string;
    url?: string;
    userId?: number;
  };

  type PictureAddRequest = {
    category?: string;
    introduction?: string;
    name?: string;
    tags?: string[];
    url?: string;
  };

  type PictureEditRequest = {
    category?: string;
    id?: number;
    introduction?: string;
    name?: string;
    tags?: string[];
    url?: string;
  };

  type PictureQueryRequest = {
    category?: string;
    current?: number;
    id?: number;
    introduction?: string;
    name?: string;
    notId?: number;
    pageSize?: number;
    picFormat?: string;
    picHeight?: number;
    picScale?: number;
    picSize?: number;
    picWidth?: number;
    reviewMessage?: string;
    reviewStatus?: number;
    reviewerId?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    tags?: string[];
    url?: string;
    userId?: number;
  };

  type PictureReviewRequest = {
    id?: number;
    reviewMessage?: string;
    reviewStatus?: number;
  };

  type PictureUpdateRequest = {
    category?: string;
    id?: number;
    introduction?: string;
    name?: string;
    tags?: string[];
    url?: string;
  };

  type PictureVO = {
    category?: string;
    createTime?: string;
    editTime?: string;
    id?: number;
    introduction?: string;
    name?: string;
    picFormat?: string;
    picHeight?: number;
    picScale?: number;
    picSize?: number;
    picWidth?: number;
    tagList?: string[];
    tags?: string;
    updateTime?: string;
    url?: string;
    userId?: number;
    userVO?: UserVO;
  };

  type Tag = {
    createTime?: string;
    id?: number;
    isDelete?: number;
    isParent?: number;
    parentId?: number;
    tagName?: string;
    updateTime?: string;
    userId?: number;
  };

  type TagAddRequest = {
    isParent?: number;
    parentId?: number;
    tagName?: string;
  };

  type TagChildren = {
    children?: TagChildren[];
    id?: number;
    tagName?: string;
  };

  type TagDTO = {
    children?: TagChildren[];
    id?: number;
    tagName?: string;
  };

  type TagEditRequest = {
    id?: number;
    tagName?: string;
  };

  type TagQueryRequest = {
    current?: number;
    id?: number;
    isParent?: number;
    pageSize?: number;
    parentId?: number;
    sortField?: string;
    sortOrder?: string;
    tagName?: string;
    userId?: number;
  };

  type TagUpdateRequest = {
    id?: number;
    isParent?: number;
    parentId?: number;
    tagName?: string;
  };

  type TagVO = {
    createTime?: string;
    id?: number;
    isParent?: number;
    parentId?: number;
    tagName?: string;
    updateTime?: string;
    userId?: number;
    userVO?: UserVO;
  };

  type uploadFileUsingPOSTParams = {
    biz?: string;
  };

  type uploadPictureUsingPOSTParams = {
    biz?: string;
    id?: number;
  };

  type User = {
    createTime?: string;
    editTime?: string;
    id?: number;
    isDelete?: number;
    mpOpenId?: string;
    unionId?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userEmail?: string;
    userGender?: number;
    userName?: string;
    userPassword?: string;
    userPhone?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserAddRequest = {
    userAccount?: string;
    userAvatar?: string;
    userEmail?: string;
    userGender?: number;
    userName?: string;
    userPhone?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserEditRequest = {
    userAvatar?: string;
    userEmail?: string;
    userGender?: number;
    userName?: string;
    userPassword?: string;
    userPhone?: string;
    userProfile?: string;
  };

  type userLoginByWxOpenUsingGETParams = {
    /** code */
    code: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: number;
    id?: number;
    mpOpenId?: string;
    notId?: number;
    orTags?: string[];
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    unionId?: string;
    userEmail?: string;
    userGender?: number;
    userName?: string;
    userPhone?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type UserUpdateRequest = {
    id?: number;
    userAvatar?: string;
    userEmail?: string;
    userGender?: number;
    userName?: string;
    userPassword?: string;
    userPhone?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    createTime?: string;
    editTime?: string;
    id?: number;
    mpOpenId?: string;
    unionId?: string;
    updateTime?: string;
    userAvatar?: string;
    userEmail?: string;
    userGender?: number;
    userName?: string;
    userPhone?: string;
    userProfile?: string;
    userRole?: string;
  };
}
