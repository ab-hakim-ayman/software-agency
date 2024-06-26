# Generated by Django 3.2.12 on 2023-09-22 08:52

import IT.OrderModel
import IT.Payment_Model
import IT.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django_resized.forms


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='BannerIT',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=300)),
                ('description', models.TextField()),
                ('img', django_resized.forms.ResizedImageField(blank=True, crop=None, force_format=None, keep_meta=True, null=True, quality=-1, scale=None, size=[1920, 1080], upload_to=IT.models.upload_to_banner)),
                ('path', models.CharField(default='/', max_length=300)),
                ('active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('last_update_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='BottomBanner',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=250)),
                ('description', models.TextField(max_length=500)),
                ('img', django_resized.forms.ResizedImageField(blank=True, crop=None, force_format=None, keep_meta=True, null=True, quality=-1, scale=None, size=[1920, 1080], upload_to=IT.models.upload_to_readmore)),
                ('link', models.TextField(blank=True, max_length=500, null=True)),
                ('active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('last_update_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='CompanyAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bank_name', models.CharField(max_length=50)),
                ('country', models.CharField(max_length=50)),
                ('account_details', models.TextField(max_length=400)),
                ('bank_img', models.FileField(blank=True, null=True, upload_to=IT.Payment_Model.upload_to_payment_doc)),
                ('bar_code', models.FileField(blank=True, null=True, upload_to=IT.Payment_Model.upload_to_bar_code)),
                ('active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('last_update_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='CompanyModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_Name', models.CharField(max_length=200)),
                ('staff_title', models.CharField(max_length=200)),
                ('staff_img', django_resized.forms.ResizedImageField(blank=True, crop=None, force_format=None, keep_meta=True, null=True, quality=-1, scale=None, size=[1920, 1080], upload_to=IT.models.upload_to_Company)),
                ('email', models.EmailField(max_length=200)),
                ('mobileNumber', models.CharField(max_length=200)),
                ('home_address', models.TextField(blank=True, max_length=300)),
                ('active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('last_update_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fullName', models.CharField(max_length=300)),
                ('email', models.EmailField(max_length=200)),
                ('phone_number', models.CharField(max_length=300)),
                ('Company_name', models.CharField(max_length=300)),
                ('website_url', models.CharField(max_length=300)),
                ('subject', models.CharField(max_length=300)),
                ('comment', models.TextField()),
                ('active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('last_update_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='GlobalLoc',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('country', models.CharField(blank=True, max_length=50, null=True)),
                ('office_address', models.CharField(blank=True, max_length=200, null=True)),
                ('email', models.EmailField(blank=True, max_length=100, null=True)),
                ('contact_number', models.CharField(blank=True, max_length=200, null=True)),
                ('active', models.BooleanField(blank=True, default=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='HomeTemplate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=300)),
                ('description', models.TextField()),
                ('img', django_resized.forms.ResizedImageField(blank=True, crop=None, force_format=None, keep_meta=True, null=True, quality=-1, scale=None, size=[1920, 1080], upload_to=IT.models.upload_to_template)),
                ('path', models.URLField(blank=True, default='http://', max_length=300)),
                ('active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('last_update_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='NoticeModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('noticeTitle', models.CharField(max_length=100)),
                ('file', models.FileField(blank=True, null=True, upload_to=IT.models.upload_to_Notice)),
                ('active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('last_update_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='OrderIt',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('currency', models.CharField(max_length=300)),
                ('project_description', models.TextField(blank=True, max_length=300, null=True)),
                ('payment_left', models.PositiveIntegerField(default=2)),
                ('total_price', models.BigIntegerField(blank=True, default=0, null=True)),
                ('total_online_paid', models.BigIntegerField(blank=True, default=0, null=True)),
                ('total_offline_paid', models.BigIntegerField(blank=True, default=0, null=True)),
                ('status', models.CharField(choices=[('pen', 'Pending'), ('pay', 'Payment'), ('can', 'Canceled'), ('wor', 'Working'), ('com', 'Completed'), ('del', 'Delivery')], default='pen', max_length=7)),
                ('delivery_date_from', models.DateField(null=True)),
                ('delivery_date_to', models.DateField(null=True)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='OurServices',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=300)),
                ('description', models.TextField()),
                ('icon', django_resized.forms.ResizedImageField(blank=True, crop=None, force_format=None, keep_meta=True, null=True, quality=-1, scale=None, size=[1920, 1080], upload_to=IT.models.upload_to_service)),
                ('path', models.CharField(default='/', max_length=300)),
                ('active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('last_update_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='PaymentMethod',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('method_name', models.CharField(max_length=50)),
                ('active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('last_update_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='ProductCategoryModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=100, null=True)),
                ('active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('last_update_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Readmore',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=300)),
                ('description', models.TextField()),
                ('img', django_resized.forms.ResizedImageField(blank=True, crop=None, force_format=None, keep_meta=True, null=True, quality=-1, scale=None, size=[1920, 1080], upload_to=IT.models.upload_to_readmore)),
                ('path', models.CharField(default='/', max_length=300)),
                ('active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('last_update_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='SecurityPage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=300)),
                ('description', models.TextField()),
                ('active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('last_update_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='TechnologiesCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=300)),
                ('active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('last_update_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='TransactionModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.PositiveIntegerField()),
                ('Transaction_id', models.CharField(max_length=200)),
                ('account_Info', models.TextField(max_length=500)),
                ('acc_holder_mail', models.EmailField(max_length=50)),
                ('acc_holder_phone', models.IntegerField()),
                ('pay_receipt_doc', models.FileField(blank=True, null=True, upload_to=IT.Payment_Model.upload_to_Pay_Receipt)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('last_update_at', models.DateTimeField(auto_now=True)),
                ('bank', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='IT.companyaccount')),
                ('order', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='IT.orderit')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Technology',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=300)),
                ('description', models.TextField()),
                ('icon', django_resized.forms.ResizedImageField(blank=True, crop=None, force_format=None, keep_meta=True, null=True, quality=-1, scale=None, size=[1920, 1080], upload_to=IT.models.upload_to_tech)),
                ('path', models.CharField(default='/', max_length=300)),
                ('active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('last_update_at', models.DateTimeField(auto_now=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='IT.technologiescategory')),
            ],
        ),
        migrations.CreateModel(
            name='SocialMediaLinkIT',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=300, null=True)),
                ('link', models.CharField(blank=True, max_length=300, null=True)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('orderit', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='IT.orderit')),
            ],
        ),
        migrations.CreateModel(
            name='ProductModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('proName', models.CharField(max_length=100)),
                ('proDescription', models.TextField(blank=True, max_length=400)),
                ('proImg', django_resized.forms.ResizedImageField(blank=True, crop=None, force_format=None, keep_meta=True, null=True, quality=-1, scale=None, size=[1920, 1080], upload_to=IT.models.upload_to_product_img)),
                ('fileOne', models.FileField(blank=True, null=True, upload_to=IT.models.upload_to_product)),
                ('fileTwo', models.FileField(blank=True, null=True, upload_to=IT.models.upload_to_product)),
                ('fileThree', models.FileField(blank=True, null=True, upload_to=IT.models.upload_to_product)),
                ('active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('last_update_at', models.DateTimeField(auto_now=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='IT.productcategorymodel')),
            ],
        ),
        migrations.CreateModel(
            name='PresentAddressIT',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_same', models.BooleanField(default=True)),
                ('country', models.CharField(blank=True, max_length=300, null=True)),
                ('State', models.CharField(blank=True, max_length=300, null=True)),
                ('city', models.CharField(blank=True, max_length=300, null=True)),
                ('houseRoad', models.CharField(blank=True, max_length=300, null=True)),
                ('zipCode', models.CharField(blank=True, max_length=300, null=True)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('orderit', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='IT.orderit')),
            ],
        ),
        migrations.CreateModel(
            name='PersonalInfoIT',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_same', models.BooleanField(default=True)),
                ('gender', models.CharField(blank=True, choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other')], max_length=7, null=True)),
                ('title', models.CharField(blank=True, max_length=7, null=True)),
                ('date_of_birth', models.CharField(blank=True, max_length=30, null=True)),
                ('occupation', models.CharField(blank=True, max_length=10, null=True)),
                ('first_name', models.CharField(blank=True, max_length=300, null=True)),
                ('last_name', models.CharField(blank=True, max_length=300, null=True)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('orderit', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='IT.orderit')),
            ],
        ),
        migrations.CreateModel(
            name='PermanentAddressIT',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_same', models.BooleanField(default=True)),
                ('address', models.TextField(blank=True, max_length=300, null=True)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('orderit', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='IT.orderit')),
            ],
        ),
        migrations.CreateModel(
            name='OtherPdfIT',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(blank=True, null=True, upload_to=IT.OrderModel.upload_to_OtherPdf)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('orderit', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='IT.orderit')),
            ],
        ),
        migrations.CreateModel(
            name='OrderPdfIT',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(blank=True, null=True, upload_to=IT.OrderModel.upload_to_OrderPdf)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('orderit', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='IT.orderit')),
            ],
        ),
        migrations.AddField(
            model_name='orderit',
            name='ProductIT',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='IT.productmodel'),
        ),
        migrations.AddField(
            model_name='orderit',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='DeliveryFile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(blank=True, null=True, upload_to=IT.OrderModel.upload_to_OrderPdf)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('orderit', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='IT.orderit')),
            ],
        ),
        migrations.CreateModel(
            name='Contact_infoIT',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_same', models.BooleanField(default=True)),
                ('personal_phone_dial_code', models.CharField(blank=True, max_length=300, null=True)),
                ('personal_phone_number', models.CharField(blank=True, max_length=300, null=True)),
                ('home_phone_dial_code', models.CharField(blank=True, max_length=300, null=True)),
                ('home_phone_number', models.CharField(blank=True, max_length=300, null=True)),
                ('contact_email', models.EmailField(blank=True, max_length=300, null=True)),
                ('contact_address', models.TextField(blank=True, max_length=300, null=True)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('orderit', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='IT.orderit')),
            ],
        ),
        migrations.CreateModel(
            name='CompanyDetailIT',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_same', models.BooleanField(default=True)),
                ('Company_same', models.CharField(blank=True, max_length=300, null=True)),
                ('Company_type', models.CharField(blank=True, choices=[('Pr', 'Private'), ('Pu', 'Public'), ('O', 'Others')], max_length=30, null=True)),
                ('Company_location', models.CharField(blank=True, max_length=300, null=True)),
                ('Company_website_url', models.URLField(blank=True, max_length=100, null=True)),
                ('Company_phone_dial_code', models.CharField(blank=True, max_length=8, null=True)),
                ('Company_phone_number', models.CharField(blank=True, max_length=30, null=True)),
                ('Company_email', models.EmailField(blank=True, max_length=50, null=True)),
                ('Company_details', models.TextField(blank=True, max_length=300, null=True)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('orderit', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='IT.orderit')),
            ],
        ),
        migrations.AddField(
            model_name='companyaccount',
            name='payment_method',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='IT.paymentmethod'),
        ),
    ]
