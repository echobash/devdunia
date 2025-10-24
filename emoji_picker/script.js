// Emoji Picker Script
document.addEventListener('DOMContentLoaded', function() {
    const emojiGrid = document.getElementById('emojiGrid');
    const emojiSearch = document.getElementById('emojiSearch');
    const copyNotification = document.getElementById('copyNotification');

    // Comprehensive emoji list with categories
    const emojiData = [
        // Smileys & People
        { emoji: '😀', unicode: 'U+1F600', name: 'grinning face', category: 'smileys' },
        { emoji: '😃', unicode: 'U+1F603', name: 'grinning face with big eyes', category: 'smileys' },
        { emoji: '😄', unicode: 'U+1F604', name: 'grinning face with smiling eyes', category: 'smileys' },
        { emoji: '😁', unicode: 'U+1F601', name: 'beaming face with smiling eyes', category: 'smileys' },
        { emoji: '😆', unicode: 'U+1F606', name: 'grinning squinting face', category: 'smileys' },
        { emoji: '😅', unicode: 'U+1F605', name: 'grinning face with sweat', category: 'smileys' },
        { emoji: '🤣', unicode: 'U+1F923', name: 'rolling on the floor laughing', category: 'smileys' },
        { emoji: '😂', unicode: 'U+1F602', name: 'face with tears of joy', category: 'smileys' },
        { emoji: '🙂', unicode: 'U+1F642', name: 'slightly smiling face', category: 'smileys' },
        { emoji: '🙃', unicode: 'U+1F643', name: 'upside-down face', category: 'smileys' },
        { emoji: '😉', unicode: 'U+1F609', name: 'winking face', category: 'smileys' },
        { emoji: '😊', unicode: 'U+1F60A', name: 'smiling face with smiling eyes', category: 'smileys' },
        { emoji: '😇', unicode: 'U+1F607', name: 'smiling face with halo', category: 'smileys' },
        { emoji: '🥰', unicode: 'U+1F970', name: 'smiling face with hearts', category: 'smileys' },
        { emoji: '😍', unicode: 'U+1F60D', name: 'smiling face with heart-eyes', category: 'smileys' },
        { emoji: '🤩', unicode: 'U+1F929', name: 'star-struck', category: 'smileys' },
        { emoji: '😘', unicode: 'U+1F618', name: 'face blowing a kiss', category: 'smileys' },
        { emoji: '😗', unicode: 'U+1F617', name: 'kissing face', category: 'smileys' },
        { emoji: '☺️', unicode: 'U+263A U+FE0F', name: 'smiling face', category: 'smileys' },
        { emoji: '😚', unicode: 'U+1F61A', name: 'kissing face with closed eyes', category: 'smileys' },
        { emoji: '😙', unicode: 'U+1F619', name: 'kissing face with smiling eyes', category: 'smileys' },
        { emoji: '🥲', unicode: 'U+1F972', name: 'smiling face with tear', category: 'smileys' },
        { emoji: '😋', unicode: 'U+1F60B', name: 'face savoring food', category: 'smileys' },
        { emoji: '😛', unicode: 'U+1F61B', name: 'face with tongue', category: 'smileys' },
        { emoji: '😜', unicode: 'U+1F61C', name: 'winking face with tongue', category: 'smileys' },
        { emoji: '🤪', unicode: 'U+1F92A', name: 'zany face', category: 'smileys' },
        { emoji: '😝', unicode: 'U+1F61D', name: 'squinting face with tongue', category: 'smileys' },
        { emoji: '🤑', unicode: 'U+1F911', name: 'money-mouth face', category: 'smileys' },
        { emoji: '🤗', unicode: 'U+1F917', name: 'hugging face', category: 'smileys' },
        { emoji: '🤭', unicode: 'U+1F92D', name: 'face with hand over mouth', category: 'smileys' },
        { emoji: '🤫', unicode: 'U+1F92B', name: 'shushing face', category: 'smileys' },
        { emoji: '🤔', unicode: 'U+1F914', name: 'thinking face', category: 'smileys' },
        { emoji: '🤐', unicode: 'U+1F910', name: 'zipper-mouth face', category: 'smileys' },
        { emoji: '🤨', unicode: 'U+1F928', name: 'face with raised eyebrow', category: 'smileys' },
        { emoji: '😐', unicode: 'U+1F610', name: 'neutral face', category: 'smileys' },
        { emoji: '😑', unicode: 'U+1F611', name: 'expressionless face', category: 'smileys' },
        { emoji: '😶', unicode: 'U+1F636', name: 'face without mouth', category: 'smileys' },
        { emoji: '😏', unicode: 'U+1F60F', name: 'smirking face', category: 'smileys' },
        { emoji: '😒', unicode: 'U+1F612', name: 'unamused face', category: 'smileys' },
        { emoji: '🙄', unicode: 'U+1F644', name: 'face with rolling eyes', category: 'smileys' },
        { emoji: '😬', unicode: 'U+1F62C', name: 'grimacing face', category: 'smileys' },
        { emoji: '🤥', unicode: 'U+1F925', name: 'lying face', category: 'smileys' },
        { emoji: '😔', unicode: 'U+1F614', name: 'pensive face', category: 'smileys' },
        { emoji: '😪', unicode: 'U+1F62A', name: 'sleepy face', category: 'smileys' },
        { emoji: '🤤', unicode: 'U+1F924', name: 'drooling face', category: 'smileys' },
        { emoji: '😴', unicode: 'U+1F634', name: 'sleeping face', category: 'smileys' },
        { emoji: '😷', unicode: 'U+1F637', name: 'face with medical mask', category: 'smileys' },
        { emoji: '🤒', unicode: 'U+1F912', name: 'face with thermometer', category: 'smileys' },
        { emoji: '🤕', unicode: 'U+1F915', name: 'face with head-bandage', category: 'smileys' },
        { emoji: '🤢', unicode: 'U+1F922', name: 'nauseated face', category: 'smileys' },
        { emoji: '🤮', unicode: 'U+1F92E', name: 'face vomiting', category: 'smileys' },
        { emoji: '🤧', unicode: 'U+1F927', name: 'sneezing face', category: 'smileys' },
        { emoji: '🥵', unicode: 'U+1F975', name: 'hot face', category: 'smileys' },
        { emoji: '🥶', unicode: 'U+1F976', name: 'cold face', category: 'smileys' },
        { emoji: '🥴', unicode: 'U+1F974', name: 'woozy face', category: 'smileys' },
        { emoji: '😵', unicode: 'U+1F635', name: 'dizzy face', category: 'smileys' },
        { emoji: '🤯', unicode: 'U+1F92F', name: 'exploding head', category: 'smileys' },
        { emoji: '🤠', unicode: 'U+1F920', name: 'cowboy hat face', category: 'smileys' },
        { emoji: '🥳', unicode: 'U+1F973', name: 'partying face', category: 'smileys' },
        { emoji: '🥸', unicode: 'U+1F978', name: 'disguised face', category: 'smileys' },
        { emoji: '😎', unicode: 'U+1F60E', name: 'smiling face with sunglasses', category: 'smileys' },
        { emoji: '🤓', unicode: 'U+1F913', name: 'nerd face', category: 'smileys' },
        { emoji: '🧐', unicode: 'U+1F9D0', name: 'face with monocle', category: 'smileys' },
        { emoji: '😕', unicode: 'U+1F615', name: 'confused face', category: 'smileys' },
        { emoji: '😟', unicode: 'U+1F61F', name: 'worried face', category: 'smileys' },
        { emoji: '🙁', unicode: 'U+1F641', name: 'slightly frowning face', category: 'smileys' },
        { emoji: '☹️', unicode: 'U+2639 U+FE0F', name: 'frowning face', category: 'smileys' },
        { emoji: '😮', unicode: 'U+1F62E', name: 'face with open mouth', category: 'smileys' },
        { emoji: '😯', unicode: 'U+1F62F', name: 'hushed face', category: 'smileys' },
        { emoji: '😲', unicode: 'U+1F632', name: 'astonished face', category: 'smileys' },
        { emoji: '😳', unicode: 'U+1F633', name: 'flushed face', category: 'smileys' },
        { emoji: '🥺', unicode: 'U+1F97A', name: 'pleading face', category: 'smileys' },
        { emoji: '😦', unicode: 'U+1F626', name: 'frowning face with open mouth', category: 'smileys' },
        { emoji: '😧', unicode: 'U+1F627', name: 'anguished face', category: 'smileys' },
        { emoji: '😨', unicode: 'U+1F628', name: 'fearful face', category: 'smileys' },
        { emoji: '😰', unicode: 'U+1F630', name: 'anxious face with sweat', category: 'smileys' },
        { emoji: '😥', unicode: 'U+1F625', name: 'sad but relieved face', category: 'smileys' },
        { emoji: '😢', unicode: 'U+1F622', name: 'crying face', category: 'smileys' },
        { emoji: '😭', unicode: 'U+1F62D', name: 'loudly crying face', category: 'smileys' },
        { emoji: '😱', unicode: 'U+1F631', name: 'face screaming in fear', category: 'smileys' },
        { emoji: '😖', unicode: 'U+1F616', name: 'confounded face', category: 'smileys' },
        { emoji: '😣', unicode: 'U+1F623', name: 'persevering face', category: 'smileys' },
        { emoji: '😞', unicode: 'U+1F61E', name: 'disappointed face', category: 'smileys' },
        { emoji: '😓', unicode: 'U+1F613', name: 'downcast face with sweat', category: 'smileys' },
        { emoji: '😩', unicode: 'U+1F629', name: 'weary face', category: 'smileys' },
        { emoji: '😫', unicode: 'U+1F62B', name: 'tired face', category: 'smileys' },
        { emoji: '🥱', unicode: 'U+1F971', name: 'yawning face', category: 'smileys' },
        { emoji: '😤', unicode: 'U+1F624', name: 'face with steam from nose', category: 'smileys' },
        { emoji: '😡', unicode: 'U+1F621', name: 'pouting face', category: 'smileys' },
        { emoji: '😠', unicode: 'U+1F620', name: 'angry face', category: 'smileys' },
        { emoji: '🤬', unicode: 'U+1F92C', name: 'face with symbols on mouth', category: 'smileys' },
        { emoji: '😈', unicode: 'U+1F608', name: 'devil', category: 'smileys' },
        { emoji: '👿', unicode: 'U+1F47F', name: 'angry devil', category: 'smileys' },
        { emoji: '💀', unicode: 'U+1F480', name: 'skull', category: 'smileys' },
        { emoji: '☠️', unicode: 'U+2620 U+FE0F', name: 'skull and crossbones', category: 'smileys' },
        { emoji: '💩', unicode: 'U+1F4A9', name: 'pile of poo', category: 'smileys' },
        { emoji: '🤡', unicode: 'U+1F921', name: 'clown face', category: 'smileys' },
        { emoji: '👹', unicode: 'U+1F479', name: 'ogre', category: 'smileys' },
        { emoji: '👺', unicode: 'U+1F47A', name: 'goblin', category: 'smileys' },
        { emoji: '👻', unicode: 'U+1F47B', name: 'ghost', category: 'smileys' },
        { emoji: '👽', unicode: 'U+1F47D', name: 'alien', category: 'smileys' },
        { emoji: '👾', unicode: 'U+1F47E', name: 'alien monster', category: 'smileys' },
        { emoji: '🤖', unicode: 'U+1F916', name: 'robot', category: 'smileys' },
        { emoji: '😺', unicode: 'U+1F63A', name: 'grinning cat', category: 'animals' },
        { emoji: '😸', unicode: 'U+1F638', name: 'grinning cat with smiling eyes', category: 'animals' },
        { emoji: '😹', unicode: 'U+1F639', name: 'cat with tears of joy', category: 'animals' },
        { emoji: '😻', unicode: 'U+1F63B', name: 'smiling cat with heart-eyes', category: 'animals' },
        { emoji: '😼', unicode: 'U+1F63C', name: 'cat with wry smile', category: 'animals' },
        { emoji: '😽', unicode: 'U+1F63D', name: 'kissing cat', category: 'animals' },
        { emoji: '🙀', unicode: 'U+1F640', name: 'weary cat', category: 'animals' },
        { emoji: '😿', unicode: 'U+1F63F', name: 'crying cat', category: 'animals' },
        { emoji: '😾', unicode: 'U+1F63E', name: 'pouting cat', category: 'animals' },

        // Nature
        { emoji: '🐶', unicode: 'U+1F436', name: 'dog face', category: 'animals' },
        { emoji: '🐱', unicode: 'U+1F431', name: 'cat face', category: 'animals' },
        { emoji: '🐭', unicode: 'U+1F42D', name: 'mouse face', category: 'animals' },
        { emoji: '🐹', unicode: 'U+1F439', name: 'hamster', category: 'animals' },
        { emoji: '🐰', unicode: 'U+1F430', name: 'rabbit face', category: 'animals' },
        { emoji: '🦊', unicode: 'U+1F98A', name: 'fox', category: 'animals' },
        { emoji: '🐻', unicode: 'U+1F43B', name: 'bear', category: 'animals' },
        { emoji: '🐼', unicode: 'U+1F43C', name: 'panda', category: 'animals' },
        { emoji: '🐨', unicode: 'U+1F428', name: 'koala', category: 'animals' },
        { emoji: '🐯', unicode: 'U+1F42F', name: 'tiger face', category: 'animals' },
        { emoji: '🦁', unicode: 'U+1F981', name: 'lion', category: 'animals' },
        { emoji: '🐮', unicode: 'U+1F42E', name: 'cow face', category: 'animals' },
        { emoji: '🐷', unicode: 'U+1F437', name: 'pig face', category: 'animals' },
        { emoji: '🐽', unicode: 'U+1F43D', name: 'pig nose', category: 'animals' },
        { emoji: '🐸', unicode: 'U+1F438', name: 'frog', category: 'animals' },
        { emoji: '🐵', unicode: 'U+1F435', name: 'monkey face', category: 'animals' },
        { emoji: '🙈', unicode: 'U+1F648', name: 'see-no-evil monkey', category: 'animals' },
        { emoji: '🙉', unicode: 'U+1F649', name: 'hear-no-evil monkey', category: 'animals' },
        { emoji: '🙊', unicode: 'U+1F64A', name: 'speak-no-evil monkey', category: 'animals' },
        { emoji: '🐒', unicode: 'U+1F412', name: 'monkey', category: 'animals' },
        { emoji: '🐔', unicode: 'U+1F414', name: 'chicken', category: 'animals' },
        { emoji: '🐧', unicode: 'U+1F427', name: 'penguin', category: 'animals' },
        { emoji: '🐦', unicode: 'U+1F426', name: 'bird', category: 'animals' },
        { emoji: '🐤', unicode: 'U+1F424', name: 'baby chick', category: 'animals' },
        { emoji: '🐣', unicode: 'U+1F423', name: 'hatching chick', category: 'animals' },
        { emoji: '🐥', unicode: 'U+1F425', name: 'front-facing baby chick', category: 'animals' },
        { emoji: '🦆', unicode: 'U+1F986', name: 'duck', category: 'animals' },
        { emoji: '🦅', unicode: 'U+1F985', name: 'eagle', category: 'animals' },
        { emoji: '🦉', unicode: 'U+1F989', name: 'owl', category: 'animals' },
        { emoji: '🦇', unicode: 'U+1F987', name: 'bat', category: 'animals' },
        { emoji: '🐺', unicode: 'U+1F43A', name: 'wolf', category: 'animals' },
        { emoji: '🐗', unicode: 'U+1F417', name: 'boar', category: 'animals' },
        { emoji: '🐴', unicode: 'U+1F434', name: 'horse face', category: 'animals' },
        { emoji: '🦄', unicode: 'U+1F984', name: 'unicorn', category: 'animals' },
        { emoji: '🐝', unicode: 'U+1F41D', name: 'honeybee', category: 'animals' },
        { emoji: '🐛', unicode: 'U+1F41B', name: 'bug', category: 'animals' },
        { emoji: '🦋', unicode: 'U+1F98B', name: 'butterfly', category: 'animals' },
        { emoji: '🐌', unicode: 'U+1F40C', name: 'snail', category: 'animals' },
        { emoji: '🐞', unicode: 'U+1F41E', name: 'lady beetle', category: 'animals' },
        { emoji: '🐜', unicode: 'U+1F41C', name: 'ant', category: 'animals' },
        { emoji: '🦗', unicode: 'U+1F997', name: 'cricket', category: 'animals' },
        { emoji: '🕷️', unicode: 'U+1F577 U+FE0F', name: 'spider', category: 'animals' },
        { emoji: '🦂', unicode: 'U+1F982', name: 'scorpion', category: 'animals' },
        { emoji: '🐢', unicode: 'U+1F422', name: 'turtle', category: 'animals' },
        { emoji: '🐍', unicode: 'U+1F40D', name: 'snake', category: 'animals' },
        { emoji: '🦎', unicode: 'U+1F98E', name: 'lizard', category: 'animals' },
        { emoji: '🦖', unicode: 'U+1F996', name: 'T-Rex', category: 'animals' },
        { emoji: '🦕', unicode: 'U+1F995', name: 'sauropod', category: 'animals' },
        { emoji: '🐙', unicode: 'U+1F419', name: 'octopus', category: 'animals' },
        { emoji: '🦑', unicode: 'U+1F991', name: 'squid', category: 'animals' },
        { emoji: '🦐', unicode: 'U+1F990', name: 'shrimp', category: 'animals' },
        { emoji: '🦞', unicode: 'U+1F99E', name: 'lobster', category: 'animals' },
        { emoji: '🦀', unicode: 'U+1F980', name: 'crab', category: 'animals' },
        { emoji: '🐡', unicode: 'U+1F421', name: 'blowfish', category: 'animals' },
        { emoji: '🐠', unicode: 'U+1F420', name: 'tropical fish', category: 'animals' },
        { emoji: '🐟', unicode: 'U+1F41F', name: 'fish', category: 'animals' },
        { emoji: '🐬', unicode: 'U+1F42C', name: 'dolphin', category: 'animals' },
        { emoji: '🐳', unicode: 'U+1F433', name: 'spouting whale', category: 'animals' },
        { emoji: '🐋', unicode: 'U+1F40B', name: 'whale', category: 'animals' },
        { emoji: '🦈', unicode: 'U+1F988', name: 'shark', category: 'animals' },
        { emoji: '🐊', unicode: 'U+1F40A', name: 'crocodile', category: 'animals' },
        { emoji: '🐅', unicode: 'U+1F405', name: 'tiger', category: 'animals' },
        { emoji: '🐆', unicode: 'U+1F406', name: 'leopard', category: 'animals' },
        { emoji: '🦓', unicode: 'U+1F993', name: 'zebra', category: 'animals' },
        { emoji: '🦍', unicode: 'U+1F98D', name: 'gorilla', category: 'animals' },
        { emoji: '🦧', unicode: 'U+1F9A7', name: 'orangutan', category: 'animals' },
        { emoji: '🐘', unicode: 'U+1F418', name: 'elephant', category: 'animals' },
        { emoji: '🦛', unicode: 'U+1F99B', name: 'hippopotamus', category: 'animals' },
        { emoji: '🦏', unicode: 'U+1F98F', name: 'rhinoceros', category: 'animals' },
        { emoji: '🐪', unicode: 'U+1F42A', name: 'camel', category: 'animals' },
        { emoji: '🐫', unicode: 'U+1F42B', name: 'two-hump camel', category: 'animals' },
        { emoji: '🦒', unicode: 'U+1F992', name: 'giraffe', category: 'animals' },
        { emoji: '🦘', unicode: 'U+1F998', name: 'kangaroo', category: 'animals' },
        { emoji: '🐃', unicode: 'U+1F403', name: 'water buffalo', category: 'animals' },
        { emoji: '🐂', unicode: 'U+1F402', name: 'ox', category: 'animals' },
        { emoji: '🐄', unicode: 'U+1F404', name: 'cow', category: 'animals' },
        { emoji: '🐎', unicode: 'U+1F40E', name: 'horse', category: 'animals' },
        { emoji: '🐖', unicode: 'U+1F416', name: 'pig', category: 'animals' },
        { emoji: '🐏', unicode: 'U+1F40F', name: 'ram', category: 'animals' },
        { emoji: '🐑', unicode: 'U+1F411', name: 'ewe', category: 'animals' },
        { emoji: '🦙', unicode: 'U+1F999', name: 'llama', category: 'animals' },
        { emoji: '🐐', unicode: 'U+1F410', name: 'goat', category: 'animals' },
        { emoji: '🦌', unicode: 'U+1F98C', name: 'deer', category: 'animals' },
        { emoji: '🐕', unicode: 'U+1F415', name: 'dog', category: 'animals' },
        { emoji: '🐩', unicode: 'U+1F429', name: 'poodle', category: 'animals' },
        { emoji: '🦮', unicode: 'U+1F9AE', name: 'guide dog', category: 'animals' },
        { emoji: '🐕‍🦺', unicode: 'U+1F415 U+200D U+1F9BA', name: 'service dog', category: 'animals' },
        { emoji: '🐈', unicode: 'U+1F408', name: 'cat', category: 'animals' },
        { emoji: '🐓', unicode: 'U+1F413', name: 'rooster', category: 'animals' },
        { emoji: '🦃', unicode: 'U+1F983', name: 'turkey', category: 'animals' },
        { emoji: '🦚', unicode: 'U+1F99A', name: 'peacock', category: 'animals' },
        { emoji: '🦜', unicode: 'U+1F99C', name: 'parrot', category: 'animals' },
        { emoji: '🐊', unicode: 'U+1F40A', name: 'crocodile', category: 'animals' },
        { emoji: '🐲', unicode: 'U+1F432', name: 'dragon face', category: 'animals' },
        { emoji: '🐉', unicode: 'U+1F409', name: 'dragon', category: 'animals' },
        { emoji: '🦕', unicode: 'U+1F995', name: 'sauropod', category: 'animals' },
        { emoji: '🦖', unicode: 'U+1F996', name: 'T-Rex', category: 'animals' },

        // Food & Drink
        { emoji: '🍎', unicode: 'U+1F34E', name: 'red apple', category: 'food' },
        { emoji: '🍊', unicode: 'U+1F34A', name: 'tangerine', category: 'food' },
        { emoji: '🍋', unicode: 'U+1F34B', name: 'lemon', category: 'food' },
        { emoji: '🍌', unicode: 'U+1F34C', name: 'banana', category: 'food' },
        { emoji: '🍉', unicode: 'U+1F349', name: 'watermelon', category: 'food' },
        { emoji: '🍇', unicode: 'U+1F347', name: 'grapes', category: 'food' },
        { emoji: '🍓', unicode: 'U+1F353', name: 'strawberry', category: 'food' },
        { emoji: '🫐', unicode: 'U+1FAD0', name: 'blueberries', category: 'food' },
        { emoji: '🍈', unicode: 'U+1F348', name: 'melon', category: 'food' },
        { emoji: '🍒', unicode: 'U+1F352', name: 'cherries', category: 'food' },
        { emoji: '🍑', unicode: 'U+1F351', name: 'peach', category: 'food' },
        { emoji: '🥭', unicode: 'U+1F96D', name: 'mango', category: 'food' },
        { emoji: '🍍', unicode: 'U+1F34D', name: 'pineapple', category: 'food' },
        { emoji: '🥥', unicode: 'U+1F965', name: 'coconut', category: 'food' },
        { emoji: '🥝', unicode: 'U+1F95D', name: 'kiwi fruit', category: 'food' },
        { emoji: '🍅', unicode: 'U+1F345', name: 'tomato', category: 'food' },
        { emoji: '🍆', unicode: 'U+1F346', name: 'eggplant', category: 'food' },
        { emoji: '🥑', unicode: 'U+1F951', name: 'avocado', category: 'food' },
        { emoji: '🥦', unicode: 'U+1F966', name: 'broccoli', category: 'food' },
        { emoji: '🥬', unicode: 'U+1F96C', name: 'leafy green', category: 'food' },
        { emoji: '🥒', unicode: 'U+1F952', name: 'cucumber', category: 'food' },
        { emoji: '🌶️', unicode: 'U+1F336 U+FE0F', name: 'hot pepper', category: 'food' },
        { emoji: '🫑', unicode: 'U+1FAD1', name: 'bell pepper', category: 'food' },
        { emoji: '🌽', unicode: 'U+1F33D', name: 'ear of corn', category: 'food' },
        { emoji: '🥕', unicode: 'U+1F955', name: 'carrot', category: 'food' },
        { emoji: '🫒', unicode: 'U+1FAD2', name: 'olive', category: 'food' },
        { emoji: '🧄', unicode: 'U+1F9C4', name: 'garlic', category: 'food' },
        { emoji: '🧅', unicode: 'U+1F9C5', name: 'onion', category: 'food' },
        { emoji: '🥔', unicode: 'U+1F954', name: 'potato', category: 'food' },
        { emoji: '🍠', unicode: 'U+1F360', name: 'roasted sweet potato', category: 'food' },
        { emoji: '🥐', unicode: 'U+1F950', name: 'croissant', category: 'food' },
        { emoji: '🥖', unicode: 'U+1F956', name: 'baguette bread', category: 'food' },
        { emoji: '🍞', unicode: 'U+1F35E', name: 'bread', category: 'food' },
        { emoji: '🥨', unicode: 'U+1F968', name: 'pretzel', category: 'food' },
        { emoji: '🥯', unicode: 'U+1F96F', name: 'bagel', category: 'food' },
        { emoji: '🧀', unicode: 'U+1F9C0', name: 'cheese wedge', category: 'food' },
        { emoji: '🥚', unicode: 'U+1F95A', name: 'egg', category: 'food' },
        { emoji: '🍳', unicode: 'U+1F373', name: 'cooking', category: 'food' },
        { emoji: '🧈', unicode: 'U+1F9C8', name: 'butter', category: 'food' },
        { emoji: '🥞', unicode: 'U+1F95E', name: 'pancakes', category: 'food' },
        { emoji: '🧇', unicode: 'U+1F9C7', name: 'waffle', category: 'food' },
        { emoji: '🥓', unicode: 'U+1F953', name: 'bacon', category: 'food' },
        { emoji: '🥩', unicode: 'U+1F969', name: 'cut of meat', category: 'food' },
        { emoji: '🍗', unicode: 'U+1F357', name: 'poultry leg', category: 'food' },
        { emoji: '🍖', unicode: 'U+1F356', name: 'meat on bone', category: 'food' },
        { emoji: '🦴', unicode: 'U+1F9B4', name: 'bone', category: 'food' },
        { emoji: '🌭', unicode: 'U+1F32D', name: 'hot dog', category: 'food' },
        { emoji: '🍔', unicode: 'U+1F354', name: 'hamburger', category: 'food' },
        { emoji: '🍟', unicode: 'U+1F35F', name: 'french fries', category: 'food' },
        { emoji: '🍕', unicode: 'U+1F355', name: 'pizza', category: 'food' },
        { emoji: '🥪', unicode: 'U+1F96A', name: 'sandwich', category: 'food' },
        { emoji: '🥙', unicode: 'U+1F959', name: 'stuffed flatbread', category: 'food' },
        { emoji: '🌮', unicode: 'U+1F32E', name: 'taco', category: 'food' }
    ];

    // Function to create emoji card
    function createEmojiCard(emojiData) {
        const card = document.createElement('div');
        card.className = 'emoji-card p-3 rounded-xl flex flex-col items-center justify-center';
        card.innerHTML = `
            <div class="emoji-text">${emojiData.emoji}</div>
            <div class="emoji-unicode">${emojiData.unicode}</div>
        `;

        // Add click event to copy emoji
        card.addEventListener('click', function() {
            copyToClipboard(emojiData.emoji);
        });

        return card;
    }

    // Function to copy text to clipboard
    async function copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            showCopyNotification();
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showCopyNotification();
        }
    }

    // Function to show copy notification
    function showCopyNotification() {
        copyNotification.style.opacity = '1';
        copyNotification.style.transform = 'translateY(0)';

        setTimeout(() => {
            copyNotification.style.opacity = '0';
            copyNotification.style.transform = 'translateY(4px)';
        }, 2000);
    }

    // Function to render emojis
    function renderEmojis(emojis) {
        emojiGrid.innerHTML = '';
        emojis.forEach(emojiData => {
            const card = createEmojiCard(emojiData);
            emojiGrid.appendChild(card);
        });
    }

    // Function to filter emojis based on search
    function filterEmojis(searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        if (term === '') {
            renderEmojis(emojiData);
            return;
        }

        const filtered = emojiData.filter(emoji =>
            emoji.name.toLowerCase().includes(term) ||
            emoji.emoji.includes(term) ||
            emoji.unicode.toLowerCase().includes(term)
        );
        renderEmojis(filtered);
    }

    // Event listeners
    emojiSearch.addEventListener('input', function(e) {
        filterEmojis(e.target.value);
    });

    // Initial render
    renderEmojis(emojiData);
});
