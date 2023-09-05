#include "main.h"
#define BUFRSIZE 1204
#define ER STDERR_FILENO

/**
* copy_file - copy the content of a file into another file
* @file1: file to copy from
* @fil2: file to be copied into
* Return: nothing or exit if it fails
**/
void copy_file(const char *file1, char *fil2)
{
	ssize_t count, count_out;
	int f1, f2, fcls1, fcls2;
	char bufr[BUFRSIZE];
	mode_t mode;

	f1 = open(file1, O_RDONLY);
	if (f1 == -1)
	{
		dprintf(ER, "Error: Can't read from file %s\n", file1);
		exit(98);
	}
	mode = S_IRUSR | S_IWUSR | S_IRGRP | S_IWGRP | S_IROTH;
	f2 = open(fil2, O_CREAT | O_WRONLY | O_TRUNC, mode);
	if (f2 == -1)
		dprintf(ER, "Error: Can't write to %s\n", fil2), exit(99);
	count = 1;
	while (count > 0)
	{
		count = read(f1, bufr, BUFRSIZE);
		if (count == -1)
		{
			dprintf(ER, "Error: Can't read from file %s\n", file1);
			exit(98);
		}
		if (count > 0)
		{
			count_out = write(f2, bufr, count);
			if (count_out == -1)
			{
				dprintf(ER, "Error: Can't write to %s\n", fil2);
				exit(99);
			}
		}
	}
	fcls1 = close(f1);
	if (fcls1 == -1)
		dprintf(ER, "Error: Can't close fd %d\n", fcls1), exit(100);
	fcls2 = close(f2);
	if (fcls2 == -1)
		dprintf(ER, "Error: Can't close fd %d\n", fcls2), exit(100);
}

/**
* main - copies the content of a file to another file
* @argc: number of arguements
* @argv: pointer to arguement
* Return: 0 on success, or exit with error message
**/
int main(int argc, char **argv)
{
	if (argc != 3)
	{
		dprintf(ER, "Usage: cp file_from file_to\n");
		exit(97);
	}
	copy_file(argv[1], argv[2]);
	return (0);
}
