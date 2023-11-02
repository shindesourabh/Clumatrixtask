import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { error } from 'console';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
 
  dataSource: any;
  addProductform !:  FormGroup;
  CommodityInfo: any;
  Commodity_Id: any;
  SuperSubCatergoryInfo:any;
  SuperSubCatergory_Id:any;
  getCategory_Id:any;
  ProductList: any;
  CardSection : boolean = true;
  ClickOnCardSection : boolean = false;
  AddNewBtn : boolean = true;
  SubCatergoryInfo: any;
  SubCatergory_Id: any;
  PackageInfo: any;
  Package_Id: any;
  packageId: any;
  SubCategoryId: any;
  superSubCategoryId: any;
  CategoryId: any;

  constructor( private getproduct : ProductService, private router : Router, private  authService : AuthService) { }

  ngOnInit(): void {
    this.createForm();
    this.getCategory();
    this.getCommodityInfo();
    this.getSuperSubCatergoryInfo();
    this.productListShow();
    this.getSubCatergoryInfo();
    this.getPackegeInfo();
  }
  createForm() {
    this.addProductform = new FormGroup({
      name: new FormControl('',[Validators.required, Validators.pattern("")]),
      images: new FormControl('', Validators.required),
      sup_sub_category_id: new FormControl('', Validators.required),
      category_id: new FormControl('', Validators.required),
      commodity_type_id: new FormControl('', Validators.required),
        sub_category_id: new FormControl('', Validators.required),
        package_id: new FormControl('', Validators.required),
        // ProductId: new FormControl('', Validators.required),
        long_description: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        is_active: new FormControl('', Validators.required),
    });
}

  getCategory(){
    this.getproduct.category()
    .subscribe(
      data => {
        this.dataSource = data;
        if (data && data.pro_category && data.pro_category.length > 0) {
          const pro_category = data.pro_category[0];
          this.CategoryId = pro_category.id;
          localStorage.setItem('categoryId',this.CategoryId)
          console.log(JSON.stringify(this.CategoryId));
        }
  })
}
 
  submitProduct(){debugger
  const newProduct = this.addProductform.value;
  console.log(newProduct);
  this.getproduct.addProduct(newProduct)
  .subscribe((data:any) =>{debugger
    this.router.navigate(['/product']);
    this.resetForm();
    alert(data.message);
  }
  )
}
resetForm(){
  this.addProductform.reset();
}

 getCommodityInfo(){
  this.getproduct.getComodityType().subscribe(
    data => {
      this.CommodityInfo = data;
      this.Commodity_Id = this.CommodityInfo[0].id;
      console.log(this.Commodity_Id);
    },
    error => {
    }
  );
 }
 getSuperSubCatergoryInfo(){debugger
  this.getproduct.get_SuperSubCatergory().subscribe(
    data => {debugger
      this.SuperSubCatergoryInfo = data;
      if (data && data.sup_sub_category && data.sup_sub_category.length > 0) {
        const firstCategory = data.sup_sub_category[0];
        this.superSubCategoryId = firstCategory.id;
        localStorage.setItem('supersubcatid',this.superSubCategoryId)
        console.log(JSON.stringify(this.superSubCategoryId));
      }
    },
    error => {
    }
  );
 }

 getSubCatergoryInfo(){debugger
  this.getproduct.get_SubCategory().subscribe(
    data => {debugger
      this.SubCatergoryInfo = data;
      if (data && data.sub_category && data.sub_category.length > 0) {
        const firstCategory = data.sub_category[0];
        this.SubCategoryId = firstCategory.id;
        localStorage.setItem('subcatid',this.SubCategoryId)
        console.log(JSON.stringify(this.SubCategoryId));
      }
    },

    error => {
    }
  );
 }
 getPackegeInfo(){debugger
  this.getproduct.getPackage().subscribe(
    data => {debugger
      this.PackageInfo = data;
      if (data && data.package && data.package.length > 0) {
        const firstCategory = data.package[0];
        this.packageId = firstCategory.id;
        localStorage.setItem('packageId',this.packageId)
        console.log(JSON.stringify(this.packageId));
      }
    },
    error => {
    }
  );
 }

 productListShow(){debugger
  this.getproduct.getProductList().subscribe(
    data =>{
      this.ProductList = data;
      console.log(this.ProductList);
      },
      error =>{

      }
  )
  }


  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
}
}

