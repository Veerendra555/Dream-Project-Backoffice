export const AppUrls = {
    // _baseUrl: 'http://localhost:3003/',
    _baseUrl: 'http://ec2-13-233-154-118.ap-south-1.compute.amazonaws.com/api/',
    // _baseUrl: '/api/',
// _baseUrl: 'http://ec2-13-233-227-57.ap-south-1.compute.amazonaws.com:3003/',
  _adminModuleUrl:'',
};
   

export const actionUrl={
  //////////////Dashboard
   _dashboardCount:"dashboardCount",
  ////Admin Login
  _loginUrl:"admin/adminLogin",
  _changePassword:"admin/updateAdminPasswordById",

  
  _addClient:"api/client/register",
  _getClient:"api/client/getClient",
  _updateClient:"api/client/updateClient",


  _addEvent:"api/event/register",
  _getEventsById:"api/event/getEventsByClientId/",
/////Member Login
  _memberLoginUrl:"api/member/memberLogin",
  _addMember:"api/member/addMember",
  _getMember:"api/member/getMembers",
  _getMemberById:"api/member/getMemberById/",
  _updateMember:"api/member/updateMember",
  _deleteMember :"api/member/deleteMemberById/",
  _updateMemberStatus:"api/member/changeStatus",


   /////////// Categories
 _addCategories:"api/categorie/addCategorie",
 _getCategories:"api/categorie/getCategories",
 _getCategoriesById:"api/categorie/getCategorieById/",
 _updateCategorieStatus:"api/categorie/changeCategorieStatus" ,
 _updateCategoriesByDisplayStatus:"api/categorie/getCategoriesByDisplayStatus" ,
 _updateCategorie:"api/categorie/updateCategorie/",
 _deleteCategorie :"category/",


    /////////// Brands
    _addBrands:"api/brand/addBrand",
    _getBrands:"api/brand/getBrands",
    _getBrandsById:"api/brand/getBrandById/",
    _getBrandsByCatId:"api/brand/getCategorieById/",
    _updateBrandStatus:"api/brand/changeBrandStatus" ,
    _updateBrand:"api/brand/updateBrand",
    _deleteBrand :"category/",

    
    /////////// Products
    _addProducts:"api/product/addProduct",
    _getProducts:"api/product/getProducts",
    _getProductsByBrandId:"api/product/getProductByBrandId/",
    _getProductById:"api/product/getProductById/",
    _updateProductStatus:"api/product/changeProductStatus" ,
    _updateProduct:"api/product/updateProduct",
    // _deleteBrand :"category/",

   ////Account Details
   _addAccountDetails:"api/account/addAccountDetails",
   _getAccountDetails:"api/account/getAccountDetails",
   
    ///////////////////////Users
_getAllUser:"api/user/getUsers",
_addUser:"api/user/addUser",
_updateUserStatus:"api/user/updateUserStatus",
_getUserById:"api/user/getUserById/",
 _deleteUser :"user/deleteUser/",
 _UserById:"api/user/updateUser/",
 _UserAddNewAddress:"user/addNewAddresss/",
 _updateUser:"api/user/updateUser",


 ///Customer

   _getCustomer:"api/user/getUsers",
   _deleteCustomer :"api/user/deleteUserById/",
  _updateCustomerStatus:"api/user/changeStatus",

//////////////////////////////////Banners

_getBanners:"api/banner/getBanners",
_addBanners:"api/banner/addBanner",
_updateBannerStatus:"api/banner/bannerStatusChange",
_deleteBanner:"api/banner/deleteBannerById/",


///////////////////////////////////Master
_addMasters:"api/master/addMaster",
_getDetailsByName:"api/master/getDetailsByName/",

//////////////////////////////////Service

_getService:"api/service/getServices",
_addService:"api/service/addService",
_updateServiceStatus:"api/service/ServicetatusChange",
_deleteService:"api/service/deleteServiceById/",


//////////Get Health Details
_addHealthDetails:"api/master/addHealthDetails",
_getHealthDetails:"api/master/getHealthDetails",

//////////Get Cycling Details
_addCyclingDetails:"api/master/addCyclingDetails",
_getCyclingDetails:"api/master/getCyclingDetails",

//////////Get Company Details
_addCompanyDetails:"api/master/addCompanyDetails",
_getCompanyDetails:"api/master/getCompanyDetails",


//////////Get Company Details
_addContacthDetails:"api/contact/addContactDetails",
_getContacthDetails:"api/contact/getContactDetails",


//////////Get Slider Details
_addSliderDetails:"api/contact/addContactDetails",
_getSliderDetails:"api/contact/getContactDetails",


   ///////////////////////Location
   _getAllLocations:"api/location/getAllLocation",
   _addLocation:"api/location/addLocation",
   _updateLocationStatus:"api/location/updateLocationStatus",
    _deleteLocation :"api/location/deleteLocation/",
    _getLocationById:"api/location/getLocation/",
    _updateLocation:"api/location/updateLocation/",

   ///////////////////////Service Type
   _getAllServiceType:"api/serviceType/getAllServiceType",
   _addServiceType:"api/serviceType/addServiceType",
   _updateServiceTypeStatus:"api/serviceType/updateServiceTypeStatus",
    _deleteServiceType :"api/serviceType/deleteServiceType/",
    _getServiceTypeById:"api/serviceType/getServiceType/",
    _updateServiceType:"api/serviceType/updateServiceType/",


  


 ///////////   SubCategories
 _getSubCategories:"subCategoryByCategoryId/",
 _addSubCategories:"subCategory",
 _getAllSubCategories:"subCategories",
 _updateSubCategorieStatus:"updateSubCategoryStatus",
  _deleteSubCategorie :"subCategory/",
  _getSubCategoriesById:"subCategory/",
  _updateSubCategorie:"subCategory/",

  ///////////////////// Service Type
  _getAllService:"service/getAllServices/",
  // _addService:"service/addService",
  // _updateServiceStatus:"service/updateServiceStatus",
  //  _deleteService :"service/deleteServices/",
   _getServiceById:"service/getServices/",
   _updateService:"service/updateService/",
 

/////////////////////////AddOns 

_getAllAddOnBySubId:"addOn/getAddOnBySubCatId/",
_addAddon:"addOn/addAddOn",
_updateAddonStatus:"addOn/updateAddOnStatusById",
_deleteAddon :"addOn/deleteAddOnById/",
_getAddonById:"addOn/getAddOnById/",
_updateAddon:"addOn/updateAddOnById/",

   ///////////////////////Partner
_getAllPartner:"partner/getAllPartners",
_addPartner:"partner/addPartner",
_updatePartnerStatus:"partner/updatePartnerStatus",
 _deletePartner :"partner/deletePartner/",
 _getPartnerById:"partner/getPartner/",
 _updatePartnerById:"partner/updatePartner/",
 _updatePartner:"partner/updateService/",
_getpartnersByCatId:"partner/getPartnerByCatId/",

   
///////////////////////////////////Orders

        _getOrders:"order/getOrder",
       _getOrderById:"order/getOrder/",
       _updateOrderStatus:"api/order/changeOrderStatus",
       _updateOrderActiveStatus:"order/updateOrderActiveStatus",
       _updateOrderById:"order/updatOrder/",
       _getOrdersByStatus:"api/order/getOrderBySpecialStatus",
       _getCancelledOrders:"order/getCancelledOrders",


////////////////////////////////// Offers Banners

_getOfferbanner:"offerbanner/getofferbanners",
_addofferbanner:"offerbanner/addofferbanner",
_updateofferbannerStatus:"offerbanner/offerbannerStatusChange",
_deleteOfferBanner:"offerbanner/offerbannerDelete/",

///////////////////////////////// Ribbons
_getRibbon:"ribbon/getRibbon",
_addRibbon:"ribbon/addribbon",
_updateRibbonStatus:"ribbon/ribbonStatusChange",
_deleteRibbon:"ribbon/ribbonDelete/",

///////////////////////////////// Popup Banners
_getpopupBanner:"popupBanner/getpopupBanner",
_addpopupBanner:"popupBanner/addpopupBanner",
_updatpopupBanner:"popupBanner/popupBannerStatusChange",
_deletepopupBanner:"popupBanner/popupBannerDelete/",

////////////////////////////Add Order
_addOrder:"order/addOrder",


////////////////////////////Footer Details
_addFooterDetails:"footer/addFooterService",
_getFooterDetails:"footer/getAllFooterService",
_getFooterById:"footer/getFooterById/",
_updateFooterDetails:"footer/updateFooter",
_deleteFooterDetails:"footer/footerServiceDelete/",

}
   

