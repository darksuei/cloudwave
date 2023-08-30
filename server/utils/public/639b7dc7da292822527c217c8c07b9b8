#include <stdlib.h>
#include "lists.h"

/**
 * free_list - Frees the memory space of a list
 * @head: Pointer to a struct's pointer
 * Return: Amount of nodes
**/

void free_list(list_t *head)
{
list_t *tmp;
while (head != NULL)
{
tmp = head;

free(head->str);
free(tmp);
head = head->next;
}
}
