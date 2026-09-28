-- Thêm các cơ sở thật khác được nhắc đến trong tài liệu (Ref/HINH ANH 2),
-- song song với 5 cơ sở đã có — không thay thế, không xoá.

insert into public.facilities (slug, name, program_slug, address, description, cover_image_url, sort_order) values
(
  'luu-xa-emmanuel',
  'Lưu Xá Emmanuel',
  'luu-tru',
  'Cơ sở 1: Đường Xô Viết Nghệ Tĩnh, Thị Nghè; Cơ sở 2: Đường Lũy Bán Bích, Tân Bình - TP.HCM',
  $desc$Nhận thấy nhu cầu được đồng hành và hỗ trợ của các em sinh viên từ các tỉnh về Thành phố học tập ngày càng gia tăng, Chị em Phan Sinh Thừa Sai Đức Mẹ đã quan tâm đến việc tạo dựng một môi trường sống an toàn, lành mạnh và phù hợp cho các em trong những năm tháng học tập xa gia đình.

Vì thế, vào năm 2008, Lưu xá Emmanuel chính thức được thành lập theo mô hình gia đình - trở thành một mái nhà thân thiện, nơi các bạn sinh viên được đón nhận, quan tâm, nâng đỡ và có cơ hội phát triển toàn diện.

Lưu xá hướng đến việc đồng hành với sinh viên trong nhiều khía cạnh của cuộc sống: phát triển nhân bản, học tập, đời sống tinh thần và đức tin, giúp mỗi bạn từng bước trưởng thành và sống trách nhiệm hơn với bản thân, gia đình và xã hội. Đặc biệt, Lưu xá Emmanuel ưu tiên đón nhận những sinh viên có hoàn cảnh khó khăn và các bạn đến từ những tỉnh thành xa.$desc$,
  '/images/facilities/luu-xa-emmanuel.webp',
  6
),
(
  'mam-non-son-ca',
  'Trường Mầm Non Sơn Ca',
  'giao-duc',
  'Xã Xuyên Mộc, TP. Hồ Chí Minh',
  $desc$Trường Mầm Non Sơn Ca - ngôi trường thân thiện, hiện đại dành cho trẻ từ 2 đến 5 tuổi. Trường có bề dày truyền thống gắn liền với quá trình phát triển của địa phương: tiền thân của trường là một nhóm trẻ nhỏ được hình thành từ năm 1987 nhằm đáp ứng nhu cầu gửi trẻ của các gia đình lao động, đặc biệt là những hộ dân có hoàn cảnh còn nhiều khó khăn trong khu vực.

Ngày nay, trên nền tảng truyền thống gần bốn thập kỷ hình thành và phát triển, Trường được đầu tư xây dựng mới với cơ sở vật chất khang trang, môi trường học tập an toàn, sạch đẹp và phù hợp với lứa tuổi mầm non. Chương trình giáo dục được thực hiện theo Chương trình Giáo dục Mầm non Quốc gia của Bộ Giáo dục và Đào tạo, kết hợp ứng dụng những xu hướng giáo dục hiện đại như STEAM nhằm khơi dậy sự tò mò, khả năng sáng tạo và tinh thần ham học hỏi của trẻ.

Bên cạnh phát triển nhận thức, Trường Mầm non Sơn Ca đặc biệt quan tâm đến việc hình thành kỹ năng sống cho trẻ ngay từ những năm đầu đời, cũng như giáo dục đạo đức và gìn giữ các giá trị văn hóa truyền thống Việt Nam.$desc$,
  '/images/facilities/mam-non-son-ca.webp',
  7
),
(
  'noi-tru-suoi-dau',
  'Nhà Nội - Bán Trú FMM Suối Dầu',
  'luu-tru',
  'Suối Dầu, Khánh Hòa',
  $desc$Cộng đoàn Niềm Vui tại Suối Dầu - Khánh Hòa là nơi chị em Phan Sinh Thừa Sai Đức Mẹ (FMM) dấn thân, mang ánh sáng tri thức và tình thương đến với 50 em đồng bào Raglai tại Nhà Nội - Bán Trú FMM Suối Dầu.

Là Thừa Sai, chị em FMM luôn ưu tiên chọn những anh chị em nghèo nhất, nơi ít có sự hiện diện của Giáo Hội nhất. Sứ mạng giáo dục qua nhà nội trú dành cho các em cấp 2 và 3 không chỉ dừng lại ở kiến thức, mà còn hướng đến việc phát triển toàn diện: lớn lên trong đức tin vững vàng, trưởng thành nhân bản và nâng cao tri thức, để mỗi em đều có thể tự tin bước vào đời.$desc$,
  '/images/facilities/noi-tru-suoi-dau.webp',
  8
),
(
  'noi-tru-thanh-my',
  'Nhà Nội Trú Thạnh Mỹ',
  'luu-tru',
  'Lâm Đồng',
  '',
  null,
  9
),
(
  'noi-tru-thang-tien',
  'Nhà Nội Trú Thăng Tiến',
  'luu-tru',
  'Gia Lai',
  '',
  null,
  10
),
(
  'phong-kham-suoi-thong',
  'Phòng Khám Suối Thông',
  'y-te',
  'Đơn Dương',
  '',
  null,
  11
)
on conflict (slug) do nothing;

-- Tin tức: Hành trình thắp sáng ước mơ (Nhà Nội - Bán Trú FMM Suối Dầu)
insert into public.news (slug, title, excerpt, content, cover_image_url, category, published, published_at, is_success_story)
values (
  'hanh-trinh-thap-sang-uoc-mo',
  'Hành Trình Thắp Sáng Ước Mơ: Câu Chuyện Về Các Em Raglai',
  'Tại Cộng đoàn Niềm Vui - Suối Dầu, Khánh Hòa, chị em Phan Sinh Thừa Sai Đức Mẹ đang đồng hành cùng 50 em đồng bào Raglai trên hành trình trưởng thành, học cách sống kiên nhẫn và tự tin tỏa sáng.',
  $news$Giữa nhịp sống hối hả của thế kỷ 21, nơi màn hình điện thoại và máy tính dần trở thành "người bạn" quen thuộc của nhiều người trẻ, có một nơi đặc biệt đang nuôi dưỡng và thắp sáng ước mơ cho các em Raglai theo một cách rất riêng. Đó là Cộng đoàn Niềm Vui tại Suối Dầu - Khánh Hòa, nơi chị em Phan Sinh Thừa Sai Đức Mẹ (FMM) đang dấn thân, mang ánh sáng tri thức và tình thương đến với 50 em đồng bào Raglai tại nhà Nội - Bán Trú FMM Suối Dầu.

Là Thừa Sai, chị em FMM luôn ưu tiên chọn những anh chị em nghèo nhất, nơi ít có sự hiện diện của Giáo Hội nhất. Tại các miền truyền giáo như Gia Lai, Đơn Dương và Khánh Hòa, việc thăng tiến đời sống cho các em sắc tộc luôn là mục tiêu ưu tiên cho mọi hoạt động. Sứ mạng giáo dục qua các nhà Nội Trú cho các em cấp 2 và 3 không chỉ dừng lại ở kiến thức, mà còn hướng đến việc phát triển toàn diện: lớn lên trong đức tin vững vàng, trưởng thành nhân bản và nâng cao tri thức, để mỗi em đều có thể tự tin bước vào đời.

Năm học mới đã bắt đầu, và nhịp sống của nhà Nội - Bán trú đã đi vào ổn định, tràn ngập tiếng cười và sự học hỏi. Mỗi ngày, bài hát chủ đề "Trưởng Thành Tính Cách" luôn được vang lên: "Hãy dám làm việc khó, Kiên nhẫn đến tận cùng, Bình tâm khi đối diện, Nguyện sống cùng với vì. Sinh ra là một bản thể, Đừng chết đi như một bản sao. Sinh ra là một vì sao, Hãy tỏa sáng trên bầu trời." Mỗi câu hát là một lời nhắc nhở, một thử thách nho nhỏ mà các em tự đặt ra cho mình - từ việc kiên nhẫn trong học tập, đến việc bình tĩnh giải quyết mâu thuẫn nhỏ với bạn bè, hay đơn giản là dám xung phong làm một việc mà trước đây còn e ngại.

Và có lẽ, "việc khó" mà chị em FMM đã và đang cùng các em thực hiện trong thời đại kỹ thuật số này, chính là lựa chọn một phương thức giải trí "không điện thoại, không máy vi tính". Vào các giờ giải trí, sân nhà Nội - Bán Trú trở thành một sân khấu sống động của tuổi thơ: tiếng cười trong veo, tiếng hò hét náo nhiệt vang lên khắp khoảng sân khi các em say sưa với bóng chuyền, cầu lông, cờ cá ngựa, cờ vua, cờ lật, uno, caro... Trong khi nhiều gia đình ngày nay đang bất lực với tệ nạn nghiện game, nghiện điện thoại, thì tại đây, các em lại chủ động lựa chọn con đường trưởng thành qua việc "nói không" với công nghệ gây nghiện.

Chúng con tạ ơn Chúa đã luôn gởi đến những ân nhân, những nhà hảo tâm đã chung tay cùng chúng con, để giúp chúng con có thể tiếp tục thi hành sứ vụ cao cả này, biểu lộ khuôn mặt tình thương của Chúa nơi những người cần được yêu thương nhất.

Sr Agnes Bích Quyên, fmm$news$,
  '/images/news/hanh-trinh-thap-sang-uoc-mo.webp',
  'Câu chuyện thành công',
  true,
  now(),
  true
)
on conflict (slug) do nothing;
