# Generated by Django 3.2.12 on 2023-09-22 08:52

import Authentication.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django_resized.forms


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('username', models.CharField(db_index=True, max_length=255, unique=True)),
                ('email', models.EmailField(db_index=True, max_length=255, unique=True)),
                ('first_name', models.CharField(max_length=255, null=True)),
                ('last_name', models.CharField(max_length=255, null=True)),
                ('is_active', models.BooleanField(default=False)),
                ('is_verified', models.BooleanField(default=False)),
                ('is_agent', models.BooleanField(default=False)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('gender', models.CharField(choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other')], max_length=20, null=True)),
                ('title', models.CharField(choices=[('Mr', 'Mr'), ('Mrs', 'Mrs'), ('Ms', 'Ms'), ('Miss', 'Miss'), ('Dr', 'Dr'), ('Engr', 'Engr'), ('Master', 'Master')], max_length=28, null=True)),
                ('date_of_birth', models.DateField(null=True)),
                ('father_name', models.CharField(blank=True, max_length=100, null=True)),
                ('mother_name', models.CharField(blank=True, max_length=100, null=True)),
                ('marital_status', models.CharField(blank=True, max_length=100, null=True)),
                ('blood_group', models.CharField(blank=True, max_length=10, null=True)),
                ('occupation', models.CharField(blank=True, max_length=100, null=True)),
                ('PhoneDialCode', models.CharField(blank=True, max_length=15, null=True)),
                ('countryName', models.CharField(blank=True, max_length=100, null=True)),
                ('phoneNumber', models.CharField(blank=True, max_length=20, null=True)),
                ('profile_picture', django_resized.forms.ResizedImageField(blank=True, crop=None, force_format=None, keep_meta=True, null=True, quality=-1, scale=None, size=[1920, 1080], upload_to=Authentication.models.upload_to_profile)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='SocialMediaLink',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=300)),
                ('link', models.CharField(max_length=300)),
                ('active', models.BooleanField(default=True)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='PresentAddress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('country', models.CharField(max_length=300)),
                ('State', models.CharField(max_length=300)),
                ('city', models.CharField(max_length=300)),
                ('houseRoad', models.CharField(max_length=300)),
                ('zipCode', models.CharField(max_length=300)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='PermanentAddress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_same', models.BooleanField(default=False, null=True)),
                ('country', models.CharField(max_length=300, null=True)),
                ('State', models.CharField(max_length=300, null=True)),
                ('city', models.CharField(max_length=300, null=True)),
                ('houseRoad', models.CharField(max_length=300, null=True)),
                ('zipCode', models.CharField(max_length=300, null=True)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='EducationalQualification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('institute', models.CharField(max_length=250, null=True)),
                ('degree_name', models.CharField(max_length=300, null=True)),
                ('course_name', models.CharField(max_length=300, null=True)),
                ('from_year', models.CharField(max_length=300, null=True)),
                ('to_year', models.CharField(max_length=300, null=True)),
                ('grade', models.CharField(max_length=300, null=True)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Contact_info',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('personal_phone_dial_code', models.CharField(max_length=300)),
                ('personal_phone_number', models.CharField(max_length=300)),
                ('home_phone_dial_code', models.CharField(max_length=300)),
                ('home_phone_number', models.CharField(max_length=300)),
                ('contact_email', models.EmailField(max_length=300)),
                ('contact_address', models.TextField(max_length=300, null=True)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='CompanyDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Company_same', models.CharField(max_length=300)),
                ('Company_type', models.CharField(choices=[('Pr', 'Private'), ('Pu', 'Public'), ('O', 'Others')], max_length=7)),
                ('Company_location', models.CharField(max_length=300, null=True)),
                ('Company_website_url', models.URLField(max_length=300, null=True)),
                ('Company_phone_dial_code', models.CharField(max_length=300)),
                ('Company_phone_number', models.CharField(max_length=300)),
                ('Company_email', models.CharField(max_length=300)),
                ('Company_details', models.TextField(max_length=300, null=True)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='CodeVerification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=300)),
                ('status', models.CharField(default=0, max_length=300)),
                ('createDate', models.CharField(default='09/22/23 14:52:55', max_length=300)),
                ('expiredDate', models.CharField(default='09/22/23 15:07:55', max_length=300)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]