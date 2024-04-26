# Generated by Django 4.2.4 on 2024-04-26 06:42

from django.db import migrations, models
import tinymce.models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0121_remove_blogs_blog_tags_remove_blogs_canonical_link_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="Testimonials",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("testimonial_name", models.CharField(max_length=100)),
                (
                    "testimonial_image",
                    models.ImageField(default="blogs.jpg", upload_to="blogs-images"),
                ),
                ("testimonial", tinymce.models.HTMLField()),
                ("date", models.DateField(auto_now_add=True)),
            ],
            options={"verbose_name_plural": "Testimonials",},
        ),
    ]
